import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  menuTableItem: componentLoader.add('MenuTableItem', './components/MenuTableItem'),
  phone: componentLoader.add('Phone', './components/Phone'),
  menuToOrder: componentLoader.add('MenuToOrder', './components/MenuToOrder'),
  Void: componentLoader.add('Void', './components/Void'),
};

export { componentLoader, Components };
