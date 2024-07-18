import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import { Request, Response, NextFunction } from 'express';

import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import * as url from 'url';
import path from 'path';
import { MenuGroupOutlet } from './db/entity/menu_group_outlet.entity.js';
import { MenuOutlet } from './db/entity/menu_outlet.entity.js';
import { sequelize } from './db/config.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const port = process.env.PORT || 3000;

const start = async () => {
  const app = express();

  await initializeDb();

  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET ?? '',
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    },
  );

  // Middleware to check if the user is authenticated
  const isAuthenticated = (req: Request & { session?: any }, res: Response, next: NextFunction) => {
    if (req.session && req.session.adminUser) {
      return next();
    }
    return res.status(401).send('Unauthorized');
  };

  app.use(express.static(path.join(__dirname, '../public')));
  app.use(admin.options.rootPath, router);

  // custom endpoint
  app.post('/admin/assign-menu', isAuthenticated, async (req: Request & { fields?: any }, res: Response) => {
    console.log('req.fields', req.fields);

    // insert into menu group outlet
    const { selectedOutlet, formDataMenu, formDataMenuGroup } = req.fields;

    console.log('selectedOutlet', selectedOutlet);
    console.log('formDataMenu', formDataMenu);
    console.log('formDataMenuGroup', formDataMenuGroup);

    // find or create

    try {
      for (let i = 0; i < selectedOutlet.length; i++) {
        // check if menu group doesnt exist in outlet
        const insertMenuGroupOutlet = await MenuGroupOutlet.findOrCreate({
          where: {
            menu_group_id: formDataMenuGroup.selectedMenuGroup.menu_group_id,
            outlet_id: selectedOutlet[i].id,
          },
          defaults: {
            menu_group_id: formDataMenuGroup.selectedMenuGroup.menu_group_id,
            position: formDataMenuGroup.menu_group_position,
            outlet_id: selectedOutlet[i].id,
            is_visible: formDataMenuGroup.menu_group_visible ?? true,
            create_date: new Date(),
            modified_date: new Date(),
            create_by: 'Kokilogy',
            modified_by: 'Kokilogy',
          },
        });

        for (let j = 0; j < formDataMenu.selectedMenu.length; j++) {
          console.log('selected menu', formDataMenu.selectedMenu[j]);
          const insertMenuOutlet = await MenuOutlet.findOrCreate({
            where: {
              menu_id: formDataMenu.selectedMenu[j].menu_id,
              menu_group_outlet_id: insertMenuGroupOutlet[0].dataValues.menu_group_outlet_id,
            },
            defaults: {
              menu_id: formDataMenu.selectedMenu[j].menu_id,
              menu_group_outlet_id: insertMenuGroupOutlet[0].dataValues.menu_group_outlet_id,
              print_kitchen_outlet_id: selectedOutlet[i].id,
              price: formDataMenu.selectedMenu[j].default_price,
              menu_name: formDataMenu.selectedMenu[j].menu_name,
              kitchen_name: formDataMenu.selectedMenu[j].kitchen_name,
              bill_name: formDataMenu.selectedMenu[j].bill_name,
              parent_id: null,
              type_menu: null,
              is_optional: formDataMenu.menu_outlet_optional ?? false,
              is_visible: formDataMenu.menu_outlet_visible ?? true,
              position: formDataMenu.menu_outlet_position,
              order_type: { data: ['APPS'] },
              create_date: new Date(),
              modified_date: new Date(),
              create_by: 'Kokilogy',
              modified_by: 'Kokilogy',
              deleted_at: null,
              info: null,
              is_available: formDataMenu.menu_outlet_available ?? true,
            },
          });

          console.log('insertMenuGroupOutlet', insertMenuGroupOutlet);
          console.log('insertMenuOutlet', insertMenuOutlet);
        }
      }

      res.json({ message: 'success' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'error' });
    }
  });

  app.post('/admin/delete-menu', isAuthenticated, async (req: Request & { fields?: any }, res: Response) => {
    console.log('req.fields', req.fields);
    const { menu_outlet_id, menu_group_outlet_id, menu_id } = req.fields.selectedMenu;

    try {
      const deleteMenuOutlet = await MenuOutlet.destroy({
        where: {
          menu_id,
          menu_group_outlet_id,
          menu_outlet_id,
        },
      });
      res.json({ message: 'Berhasil menghapus menu!', data: deleteMenuOutlet });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'error' });
    }
  });

  app.post('/admin/edit-menu-group', isAuthenticated, async (req: Request & { fields?: any }, res: Response) => {
    console.log('req.fields', req.fields);
    const { menu_group_outlet_id, menu_group_id, outlet_id, position, is_visible } = req.fields.data;

    try {
      // find
      const findMenuGroupOutlet = await MenuGroupOutlet.findOne({
        where: menu_group_outlet_id,
      });

      if (findMenuGroupOutlet) {
        findMenuGroupOutlet.position = position;
        findMenuGroupOutlet.is_visible = is_visible;
        findMenuGroupOutlet.save();
      }

      res.json({ message: 'Berhasil mengubah menu group!', data: findMenuGroupOutlet });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'error' });
    }
  });

  app.post('/admin/sold-out-menu', isAuthenticated, async (req: Request & { fields?: any }, res: Response) => {
    console.log('req.fields', req.fields);
    const { menu_outlet_id, is_available } = req.fields;

    try {
      // find
      const findMenuOutlet = await MenuOutlet.findOne({
        where: menu_outlet_id,
      });

      if (findMenuOutlet) {
        findMenuOutlet.is_available = is_available;
        findMenuOutlet.save();
      }

      res.json({ message: 'Berhasil mengubah menu!', data: findMenuOutlet });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'error' });
    }
  });

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
