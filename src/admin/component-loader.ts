import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  menuTableItem: componentLoader.add('MenuTableItem', './components/MenuTableItem'),
  menuGroup: componentLoader.add('MenuGroup', './components/MenuGroupItem'),
};

export { componentLoader, Components };
