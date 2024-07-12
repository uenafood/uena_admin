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
} from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import axios, { AxiosResponse } from 'axios';

import { MenuTable } from '../../db/entity/menu.entity.js';
import { OutletTable } from '../../db/entity/outlet.entity.js';
import { MenuOutlet } from '../../db/entity/menu_outlet.entity.js';

type menuOutletTypes = MenuOutlet & { MenuGroupOutlet: { outlet_id: number } };

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
  const [menuOutlet, setMenuOutlet] = React.useState<menuOutletTypes[] | undefined>([]);
  const [selectedOutlet, setSelectedOutlet] = React.useState({
    value: '',
    label: '',
  });

  const [selectedMenu, setSelectedMenu] = React.useState({
    menu_outlet_id: 0,
    outlet_id: 0,
    menu_id: 0,
    menu_group_outlet_id: 0,
    menu_name: '',
  });

  const api = new ApiClient();

  React.useEffect(() => {
    api
      .getPage({ pageName: 'editMenuToOutlet' })
      .then((response: AxiosResponse) => {
        setResponseData(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const menuOutlet = responseData?.menuOutlet.filter(
      (item: menuOutletTypes) => item.MenuGroupOutlet.outlet_id === Number(selectedOutlet.value),
    );
    console.log('menuOutlet', menuOutlet);
    setMenuOutlet(menuOutlet);
  }, [selectedOutlet]);

  const handleSubmit = async (): Promise<void> => {
    console.log('selectedOutlet', selectedOutlet);
    console.log('selectedMenu', selectedMenu);

    const response = await axios
      .post('/admin/delete-menu', {
        selectedMenu,
      })
      .then((res) => {
        SetSnackbarData({
          message: 'Berhasil Menghapus Menu',
          isShow: true,
          variant: 'success',
        });
        console.log(res);
        // reset selectedMenu
        setMenuOutlet((prev = []) => prev.filter((item) => item.menu_outlet_id !== selectedMenu.menu_outlet_id));
        setSelectedMenu({
          menu_outlet_id: 0,
          outlet_id: 0,
          menu_id: 0,
          menu_group_outlet_id: 0,
          menu_name: '',
        });
        alert('Berhasil Menghapus Menu!');
      })
      .catch((e) => {
        SetSnackbarData({
          message: 'Gagal Menambahkan Data',
          isShow: true,
          variant: 'danger',
        });
        console.error(e);
      })
      .finally();
    console.log('response', response);
  };

  return (
    <>
      {isShowModal && (
        <Modal
          buttons={[
            {
              label: 'Cancel',
              onClick: () => {
                setIsShowModal(false);
              },
            },
            {
              label: 'Delete',
              variant: 'danger',
              onClick: () => {
                setIsShowModal(false);
                console.log('selectedMenu', selectedMenu);
                handleSubmit();
              },
            },
          ]}
          icon="AlertTriangle"
          label="Warning"
          title="Konfirmasi hapus menu"
          variant="danger"
          subTitle={`
        Apakah anda yakin ingin menghapus
        "${
          // show menu name
          selectedMenu && selectedMenu.menu_name
        }"?`}
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
              <Header.H3>Edit Menu to Outlet</Header.H3>
            </Box>
            <FormGroup>
              <Label required>Outlet</Label>
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

            <p
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              Selected outlet id : {selectedOutlet.value}
            </p>
            <br />

            {selectedOutlet.value && (
              <section
                style={{
                  marginTop: '50px',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nama Menu</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {menuOutlet?.map((item: menuOutletTypes) => {
                      return (
                        <TableRow key={item.menu_outlet_id}>
                          <TableCell>{item.menu_name}</TableCell>
                          <TableCell>
                            <Button
                              variant="danger"
                              onClick={() => {
                                setIsShowModal(true);
                                setSelectedMenu({
                                  menu_outlet_id: item.menu_outlet_id,
                                  outlet_id: item.MenuGroupOutlet.outlet_id,
                                  menu_id: item.menu_id,
                                  menu_group_outlet_id: item.menu_group_outlet_id,
                                  menu_name: item.menu_name,
                                });
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </section>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
