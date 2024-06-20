import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  menuTableItem: componentLoader.add('MenuTableItem', './components/MenuTableItem'),
  // other custom components
};

export { componentLoader, Components };
