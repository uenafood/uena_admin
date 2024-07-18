import React from 'react';
import {
  Box,
  Button,
  Header,
  FormGroup,
  Label,
  Select,
  Loader,
  MessageBox,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Badge,
  Icon,
} from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import axios, { AxiosResponse } from 'axios';

import { MenuTable } from '../../db/entity/menu.entity.js';
import { OutletTable } from '../../db/entity/outlet.entity.js';
import { MenuOutlet } from '../../db/entity/menu_outlet.entity.js';

type menuOutletTypes = MenuOutlet & {
  MenuGroupOutlet: {
    outlet_id: number;
    MenuGroup: {
      menu_group_id: number;
      name: string;
    };
  };
};

interface ResponseData {
  menu: MenuTable[];
  outlet: OutletTable[];
  menuOutlet: menuOutletTypes[];
}

export default function EditMenuPages() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isShowModal, setIsShowModal] = React.useState(false);

  const [snackbarData, SetSnackbarData] = React.useState({
    message: '',
    variant: 'info',
    isShow: false,
  });

  const [responseData, setResponseData] = React.useState<ResponseData>();
  const [selectedOutlet, setSelectedOutlet] = React.useState([]);
  const [selectedMenu, setSelectedMenu] = React.useState([]);
  const [menuOutlet, setMenuOutlet] = React.useState<menuOutletTypes[] | undefined>([]);

  const [soldOutMenu, setSoldOutMenu] = React.useState({
    menu_outlet_id: 0,
    outlet_id: 0,
    menu_id: 0,
    menu_group_outlet_id: 0,
    menu_name: '',
    is_available: false,
  });

  const [isSubmit, setIsSubmit] = React.useState(false);

  const api = new ApiClient();

  React.useEffect(() => {
    api
      .getPage({ pageName: 'soldOutMenu' })
      .then((response: AxiosResponse) => {
        setResponseData(response.data);
        setMenuOutlet(response.data.menuOutlet);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (selectedOutlet.length > 0 && selectedMenu.length > 0) {
      const menuOutlet = responseData?.menuOutlet.filter((item: menuOutletTypes) => {
        return (
          selectedOutlet.some((outlet: { value: number }) => outlet.value === item.MenuGroupOutlet.outlet_id) &&
          selectedMenu.some((menu: { value: number }) => menu.value === item.menu_id)
        );
      });
      setMenuOutlet(menuOutlet);
    } else if (selectedOutlet.length > 0) {
      const menuOutlet = responseData?.menuOutlet.filter((item: menuOutletTypes) => {
        return selectedOutlet.some((outlet: { value: number }) => outlet.value === item.MenuGroupOutlet.outlet_id);
      });
      setMenuOutlet(menuOutlet);
    } else if (selectedMenu.length > 0) {
      const menuOutlet = responseData?.menuOutlet.filter((item: menuOutletTypes) => {
        return selectedMenu.some((menu: { value: number }) => menu.value === item.menu_id);
      });
      setMenuOutlet(menuOutlet);
    } else {
      setMenuOutlet(responseData?.menuOutlet);
    }
  }, [selectedOutlet, selectedMenu]);

  const handleSubmit = async () => {
    setIsSubmit(true);
    await axios
      .post(`/admin/sold-out-menu`, {
        menu_outlet_id: soldOutMenu.menu_outlet_id,
        is_available: !soldOutMenu.is_available,
      })
      .then((res) => {
        console.log(res.data);
        SetSnackbarData({
          message: 'Berhasil mengubah status menu',
          isShow: true,
          variant: 'success',
        });
        //@ts-ignore
        setResponseData((prev) => {
          return {
            ...prev,
            //@ts-ignore
            menuOutlet: prev.menuOutlet.map((item) => {
              if (item.menu_outlet_id === soldOutMenu.menu_outlet_id) {
                return {
                  ...item,
                  is_available: !soldOutMenu.is_available,
                };
              }
              return item;
            }),
          };
        });
        //@ts-ignore
        setMenuOutlet((prev = []) => {
          return prev.map((item) => {
            if (item.menu_outlet_id === soldOutMenu.menu_outlet_id) {
              return {
                ...item,
                is_available: !soldOutMenu.is_available,
              };
            }
            return item;
          });
        });
        setIsShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        SetSnackbarData({
          message: 'Gagal mengubah status menu',
          isShow: true,
          variant: 'danger',
        });
      })
      .finally(() => {
        console.log('finally');
        setIsSubmit(false);
      });
  };

  return (
    <>
      {isShowModal && (
        <Modal
          children={
            <>
              <p
                style={{
                  lineHeight: '24px',
                }}
              >
                Apakah anda yakin ingin {soldOutMenu.is_available ? 'Sold Out' : 'set available'} menu "
                <span style={{ fontWeight: 'bold' }}>{soldOutMenu.menu_name}</span>" di outlet{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {' '}
                  {responseData?.outlet?.find((outlet) => outlet.id === soldOutMenu.outlet_id)?.full_name}
                </span>
              </p>
              <div
                style={{
                  marginTop: '24px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '16px',
                }}
              >
                <Button
                  disabled={isSubmit}
                  variant="outlined"
                  onClick={() => {
                    setIsShowModal(false);
                    setSoldOutMenu({
                      menu_outlet_id: 0,
                      outlet_id: 0,
                      menu_id: 0,
                      menu_group_outlet_id: 0,
                      menu_name: '',
                      is_available: false,
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isSubmit}
                  variant="contained"
                  color={soldOutMenu.is_available ? 'danger' : 'success'}
                  onClick={handleSubmit}
                >
                  {soldOutMenu.is_available ? 'Set Sold Out' : 'Set Available'}
                </Button>
              </div>
              {isSubmit && <Loader />}
            </>
          }
          icon="AlertTriangle"
          label="Warning"
          title={`Konfirmasi ${soldOutMenu.is_available ? 'Set Sold Out' : 'Set Available'}`}
          variant="danger"
        />
      )}

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
              <Header.H3>SOLD OUT MENU</Header.H3>
              <p
                style={{
                  marginBottom: '24px',
                }}
              >
                Halaman untuk mengatur menu yang sold out. Gunakan filter outlet dan menu untuk memudahkan pencarian.
              </p>
            </Box>
            <FormGroup>
              <Label required>Outlet</Label>
              <Select
                value={selectedOutlet}
                options={responseData?.outlet?.map((item: OutletTable) => {
                  return { value: item.id, label: item.full_name };
                })}
                isMulti
                onChange={(selected) => {
                  setSelectedOutlet(
                    selected.map((item: { value: string; label: string }) => {
                      return { value: item.value, label: item.label };
                    }),
                  );
                }}
              ></Select>
            </FormGroup>
            <FormGroup>
              <Label required>Menu</Label>
              <Select
                value={selectedMenu}
                options={responseData?.menu?.map((item: MenuTable) => {
                  return { value: item.menu_id, label: item.menu_name };
                })}
                isMulti
                onChange={(selected) => {
                  setSelectedMenu(
                    selected.map((item: { value: string; label: string }) => {
                      return { value: item.value, label: item.label };
                    }),
                  );
                }}
              ></Select>
            </FormGroup>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '16px',
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedOutlet([]);
                  setSelectedMenu([]);
                }}
              >
                <Icon icon="RefreshCw" />
                Reset
              </Button>
            </div>
            <section
              style={{
                marginTop: '24px',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nama Menu</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Outlet</TableCell>
                    <TableCell>Menu Group</TableCell>
                    <TableCell>Is Available</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menuOutlet?.map((item: menuOutletTypes) => {
                    return (
                      <TableRow key={item.menu_outlet_id}>
                        <TableCell>{item.menu_name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          {
                            responseData?.outlet?.find((outlet) => outlet.id === item.MenuGroupOutlet.outlet_id)
                              ?.full_name
                          }
                        </TableCell>
                        <TableCell>
                          {
                            menuOutlet.find((menu) => menu.menu_group_outlet_id === item.menu_group_outlet_id)
                              ?.MenuGroupOutlet.MenuGroup.name
                          }
                        </TableCell>
                        <TableCell>
                          {item.is_available ? (
                            <Badge size="sm" variant="success">
                              Yes
                            </Badge>
                          ) : (
                            <Badge size="sm" variant="danger">
                              No
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="contained"
                            color={item.is_available ? 'danger' : 'success'}
                            onClick={() => {
                              setIsShowModal(true);
                              setSoldOutMenu({
                                menu_outlet_id: item.menu_outlet_id,
                                outlet_id: item.MenuGroupOutlet.outlet_id,
                                menu_id: item.menu_id,
                                menu_group_outlet_id: item.menu_group_outlet_id,
                                menu_name: item.menu_name,
                                is_available: item.is_available ?? false,
                              });
                            }}
                          >
                            {item.is_available ? 'Set Sold Out' : 'Set Available'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </section>
          </Box>
        </Box>
      )}
    </>
  );
}
