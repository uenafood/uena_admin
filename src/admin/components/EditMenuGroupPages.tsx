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
  Loader,
  MessageBox,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Modal,
} from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import axios, { AxiosResponse } from 'axios';

import { OutletTable } from '../../db/entity/outlet.entity.js';
import { MenuGroupTable } from '../../db/entity/menu_group.entity.js';
import { MenuGroupOutlet } from '../../db/entity/menu_group_outlet.entity.js';

interface ResponseData {
  menuGroupOutlet: MenuGroupOutlet[];
  outlet: OutletTable[];
  menuGroup: MenuGroupTable[];
}

export default function EditMenuGroupPages() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmit, setIsSubmit] = React.useState(false);

  const [snackbarData, SetSnackbarData] = React.useState({
    message: '',
    variant: 'info',
    isShow: false,
  });

  const [responseData, setResponseData] = React.useState<ResponseData>();
  const [selectedOutlet, setSelectedOutlet] = React.useState({
    value: 0,
    label: '',
  });
  const [menuGroupOutlet, setMenuGroupOutlet] = React.useState<MenuGroupOutlet[] | undefined>([]);
  const [selectedMenuGroup, setSelectedMenuGroup] = React.useState({
    menu_group_outlet_id: 0,
    menu_group_id: 0,
    outlet_id: 0,
    position: 0,
    is_visible: false,
  });
  const [isShowModal, setIsShowModal] = React.useState(false);

  const api = new ApiClient();

  React.useEffect(() => {
    api
      .getPage({ pageName: 'editMenuGroupOutlet' })
      .then((response: AxiosResponse) => {
        console.log('response', response.data);
        setResponseData(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // listen to selected outlet
  React.useEffect(() => {
    console.log('selectedOutlet', selectedOutlet);
    // filter menu group by selected outlet
    const menuGroupOutlet = responseData?.menuGroupOutlet?.filter((item) => item.outlet_id === selectedOutlet.value);
    console.log('menuGroupOutlet', menuGroupOutlet);
    setMenuGroupOutlet(menuGroupOutlet);
  }, [selectedOutlet, responseData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // get form data
    const formData = new FormData(e.currentTarget);
    const data = {
      menu_group_outlet_id: selectedMenuGroup.menu_group_outlet_id,
      menu_group_id: selectedMenuGroup.menu_group_id,
      outlet_id: selectedMenuGroup.outlet_id,
      position: Number(formData.get('position')),
      is_visible: formData.get('is_visible') === 'on',
    };
    console.log('data handlesubmit', data);

    setIsSubmit(true);
    await axios
      .post('/admin/edit-menu-group', {
        data,
      })
      .then((res) => {
        console.log('axios suksessss', res.data);
        setIsShowModal(false);
        SetSnackbarData({
          ...snackbarData,
          isShow: true,
          message: 'Success',
          variant: 'success',
        });
        setResponseData({
          ...responseData,
          // @ts-ignore
          menuGroupOutlet: responseData?.menuGroupOutlet?.map((item) => {
            if (item.menu_group_outlet_id === selectedMenuGroup.menu_group_outlet_id) {
              return {
                ...item,
                position: data.position,
                is_visible: data.is_visible,
              };
            }
            return item;
          }),
        });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsSubmit(false);
      });
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
          {isShowModal && (
            <Modal>
              <Box variant="grey">
                <Box flexGrow={1}>
                  <Header.H3>
                    {
                      responseData?.menuGroup?.find(
                        (menuGroup) => menuGroup.menu_group_id === selectedMenuGroup.menu_group_id,
                      )?.name
                    }
                  </Header.H3>
                </Box>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label required>Position</Label>
                    <Input type="number" name="position" defaultValue={selectedMenuGroup.position} />
                  </FormGroup>
                  <FormGroup>
                    <Label required>Is Visible</Label>
                    <CheckBox name="is_visible" checked={selectedMenuGroup.is_visible} />
                  </FormGroup>
                  <Box>
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                      }}
                    >
                      <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        // onClick={handleSubmit}
                        disabled={isSubmit}
                      >
                        Submit
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="danger"
                        onClick={() => {
                          setIsShowModal(false);
                          setSelectedMenuGroup({} as any);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Box>
                </form>
              </Box>
            </Modal>
          )}
          <Box variant="white">
            <Box flexGrow={1}>
              <Header.H3>Edit Menu Group Outlet</Header.H3>
            </Box>

            <FormGroup>
              <Label required>Nama Outlet</Label>
              <Select
                value={selectedOutlet}
                options={responseData?.outlet?.map((item: OutletTable) => {
                  return { value: item.id, label: item.full_name };
                })}
                onChange={(selected) => {
                  setSelectedOutlet({
                    value: selected.value,
                    label: selected.label,
                  });
                }}
              ></Select>
            </FormGroup>
            <br />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Is Visible</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuGroupOutlet?.map((item) => {
                  return (
                    <TableRow key={item.menu_group_outlet_id}>
                      <TableCell>
                        {
                          responseData?.menuGroup?.find((menuGroup) => menuGroup.menu_group_id === item.menu_group_id)
                            ?.name
                        }
                      </TableCell>
                      <TableCell>{item.position}</TableCell>
                      <TableCell>{item.is_visible ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => {
                            setIsShowModal(true);
                            setSelectedMenuGroup({
                              menu_group_outlet_id: item.menu_group_outlet_id,
                              menu_group_id: item.menu_group_id,
                              outlet_id: item.outlet_id,
                              position: item.position,
                              is_visible: item.is_visible,
                            });
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Box>
      )}
    </div>
  );
}
