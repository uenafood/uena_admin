import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  menuTableItem: componentLoader.add('MenuTableItem', './components/MenuTableItem'),
  phone: componentLoader.add('Phone', './components/Phone'),
  menuToOrder: componentLoader.add('MenuToOrder', './components/MenuToOrder'),
  Void: componentLoader.add('Void', './components/Void'),
  MultiSelect: componentLoader.add('MultiSelect', './components/MultiSelect'),
  SingleBadge: componentLoader.add('SingleBadge', './components/SingleBadge'),
  DiffTime: componentLoader.add('DiffTime', './components/DiffTime'),
};

export { componentLoader, Components };
