import React from 'react';
import {
  Box,
  Button,
  Header,
  FormGroup,
  Label,
  Input,
  CheckBox,
  Select,
  Section,
  CardTitle,
  Loader,
  MessageBox,
} from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import axios, { AxiosResponse } from 'axios';

import { MenuTable } from '../../db/entity/menu.entity.js';
import { OutletTable } from '../../db/entity/outlet.entity.js';
import { MenuGroupTable } from '../../db/entity/menu_group.entity.js';

interface ResponseData {
  menu: MenuTable[];
  outlet: OutletTable[];
  menuGroup: MenuGroupTable[];
}

export default function AssignMenuPages() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmit, setIsSubmit] = React.useState(false);

  const [snackbarData, SetSnackbarData] = React.useState({
    message: '',
    variant: 'info',
    isShow: false,
  });

  const [responseData, setResponseData] = React.useState<ResponseData>();
  const [selectedOutlet, setSelectedOutlet] = React.useState([]);

  const [formDataMenu, setFormDataMenu] = React.useState({
    selectedMenu: [],
    menu_outlet_position: '',
    menu_outlet_optional: false,
    menu_outlet_visible: true,
    menu_outlet_available: true,
  });

  interface SelectedMenuGroup {
    value: number;
    label: string;
  }

  const [formDataMenuGroup, setFormDataMenuGroup] = React.useState<{
    selectedMenuGroup: SelectedMenuGroup;
    menu_group_position: string;
    menu_group_visible: boolean;
  }>({
    selectedMenuGroup: { value: 0, label: '' },
    menu_group_position: '',
    menu_group_visible: true,
  });

  const api = new ApiClient();

  React.useEffect(() => {
    api
      .getPage({ pageName: 'assignMenuToOutlet' })
      .then((response: AxiosResponse) => {
        setResponseData(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const resetForm = () => {
    setSelectedOutlet([]);
    setFormDataMenu({
      selectedMenu: [],
      menu_outlet_position: '',
      menu_outlet_optional: false,
      menu_outlet_visible: true,
      menu_outlet_available: true,
    });
    setFormDataMenuGroup({
      selectedMenuGroup: {
        value: 0,
        label: '',
      },
      menu_group_position: '',
      menu_group_visible: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmit(true);
    const response = await axios
      .post('/admin/assign-menu', {
        selectedOutlet: selectedOutlet.map((item: { value: number; label: string }) => {
          return responseData?.outlet?.find((outlet) => outlet.id === item.value);
        }),
        formDataMenu: {
          ...formDataMenu,
          // map selected menu and find the menu object from responseData
          selectedMenu: formDataMenu.selectedMenu.map((item: { value: number; label: string }) => {
            const res = responseData?.menu?.find((menu) => menu.menu_id === item.value);
            if (res !== null) {
              return res;
            }
          }),
          //
        },
        formDataMenuGroup: {
          ...formDataMenuGroup,
          selectedMenuGroup: responseData?.menuGroup?.find(
            (menuGroup) => menuGroup.menu_group_id === formDataMenuGroup.selectedMenuGroup.value,
          ),
        },
      })
      .then(() => {
        SetSnackbarData({
          message: 'Berhasil Menambahkan Data',
          isShow: true,
          variant: 'success',
        });
        //reset all form
        resetForm();
      })
      .catch((e) => {
        SetSnackbarData({
          message: 'Gagal Menambahkan Data',
          isShow: true,
          variant: 'danger',
        });
      })
      .finally(() => setIsSubmit(false));
    console.log('response', response);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Box variant="grey">
          {snackbarData.isShow && (
            <MessageBox
              message={snackbarData.message}
              onCloseClick={() => {
                SetSnackbarData({
                  ...snackbarData,
                  isShow: false,
                });
              }}
              size="sm"
              variant={snackbarData.variant}
            />
          )}
          <Box variant="white">
            <Box flexGrow={1}>
              <Header.H3>Assign Menu to Outlet</Header.H3>
            </Box>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label required>Nama Menu</Label>
                <Select
                  value={formDataMenu.selectedMenu}
                  isMulti
                  options={
                    responseData?.menu?.map((item: MenuTable) => {
                      return { value: item.menu_id, label: item.menu_name };
                    }) || []
                  }
                  onChange={(selected) => {
                    setFormDataMenu({
                      ...formDataMenu,
                      selectedMenu: selected.map((item: { value: string; label: string }) => {
                        return { value: item.value, label: item.label };
                      }),
                    });
                  }}
                ></Select>
              </FormGroup>
              <FormGroup>
                <Label required>Nama Outlet</Label>
                <Select
                  isMulti
                  value={selectedOutlet}
                  options={responseData?.outlet?.map((item: OutletTable) => {
                    return { value: item.id, label: item.full_name };
                  })}
                  onChange={(selected) => {
                    setSelectedOutlet(
                      selected.map((item: { value: string; label: string }) => {
                        return { value: item.value, label: item.label };
                      }),
                    );
                  }}
                ></Select>
              </FormGroup>
              <Section>
                <Box mb="xl">
                  <CardTitle>Menu Outlet</CardTitle>
                </Box>
                <FormGroup>
                  <Label required>Position</Label>
                  <Input
                    type="number"
                    name="menu_outlet_position"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setFormDataMenu({
                        ...formDataMenu,
                        menu_outlet_position: (e.target as HTMLInputElement).value,
                      });
                    }}
                  />
                </FormGroup>
                <Box flex>
                  <Box flexDirection="column" marginRight={15}>
                    <CheckBox
                      id="menu_outlet_optional"
                      checked={formDataMenu.menu_outlet_optional}
                      onChange={(e) => {
                        setFormDataMenu({
                          ...formDataMenu,
                          menu_outlet_optional: !formDataMenu.menu_outlet_optional,
                        });
                      }}
                    />
                    <Label inline htmlFor="menu_outlet_optional" ml="default">
                      Is Optional
                    </Label>
                  </Box>
                  <Box flexDirection="column" marginRight={15}>
                    <CheckBox
                      id="menu_outlet_visible"
                      checked={formDataMenu.menu_outlet_visible}
                      onChange={(e) => {
                        setFormDataMenu({
                          ...formDataMenu,
                          menu_outlet_visible: !formDataMenu.menu_outlet_visible,
                        });
                      }}
                    />
                    <Label inline htmlFor="menu_outlet_visible" ml="default">
                      Is Visible
                    </Label>
                  </Box>
                  <Box flexDirection="column" marginRight={15}>
                    <CheckBox
                      id="menu_outlet_available"
                      checked={formDataMenu.menu_outlet_available}
                      onChange={(e) => {
                        setFormDataMenu({
                          ...formDataMenu,
                          menu_outlet_available: !formDataMenu.menu_outlet_available,
                        });
                      }}
                    />
                    <Label inline htmlFor="menu_outlet_available" ml="default">
                      Is Available
                    </Label>
                  </Box>
                </Box>
              </Section>
              <br />
              <Section>
                <Box mb="xl">
                  <CardTitle>Menu Group</CardTitle>
                </Box>
                <FormGroup>
                  <Label required>Menu Group Name</Label>
                  <Select
                    value={formDataMenuGroup.selectedMenuGroup}
                    options={responseData?.menuGroup?.map((item: MenuGroupTable) => {
                      return {
                        value: item.menu_group_id,
                        label: item.name,
                      };
                    })}
                    onChange={(selected) => {
                      setFormDataMenuGroup({
                        ...formDataMenuGroup,
                        selectedMenuGroup: {
                          value: selected.value,
                          label: selected.label,
                        },
                      });
                    }}
                  ></Select>
                </FormGroup>
                <FormGroup>
                  <Label required>Position</Label>
                  <Input
                    type="number"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setFormDataMenuGroup({
                        ...formDataMenuGroup,
                        menu_group_position: (e.target as HTMLInputElement).value,
                      });
                    }}
                  />
                </FormGroup>
                <Box flex>
                  <Box flexDirection="column" marginRight={15}>
                    <CheckBox
                      id="menu_group_visible"
                      checked={formDataMenuGroup.menu_group_visible}
                      onChange={(e) => {
                        setFormDataMenuGroup({
                          ...formDataMenuGroup,
                          menu_group_visible: !formDataMenuGroup.menu_group_visible,
                        });
                      }}
                    />
                    <Label inline htmlFor="menu_group_visible" ml="default">
                      Is Visible
                    </Label>
                  </Box>
                </Box>
              </Section>
              <br />
              <Button variant="contained" type="primary" disabled={isSubmit}>
                {isSubmit ? 'Submitting....' : 'Submit'}
              </Button>
            </form>
          </Box>
        </Box>
      )}
    </div>
  );
}
