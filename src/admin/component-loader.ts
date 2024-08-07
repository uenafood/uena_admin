import { ComponentLoader, Dashboard, Edit } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  phone: componentLoader.add('Phone', './components/Phone'),
  menuToOrder: componentLoader.add('MenuToOrder', './components/MenuToOrder'),
  Void: componentLoader.add('Void', './components/Void'),
  MultiSelect: componentLoader.add('MultiSelect', './components/MultiSelect'),
  SingleBadge: componentLoader.add('SingleBadge', './components/SingleBadge'),
  DiffTime: componentLoader.add('DiffTime', './components/DiffTime'),
  AssignMenuPages: componentLoader.add('AssignMenuPages', './components/AssignMenuPages'),
  EditMenuPages: componentLoader.add('EditMenuPages', './components/EditMenuPages'),
  EditMenuGroupPages: componentLoader.add('EditMenuGroupPages', './components/EditMenuGroupPages'),
  RenderImage: componentLoader.add('RenderImage', './components/RenderImage'),
  SoldOutMenu: componentLoader.add('SoldOutMenu', './components/SoldOutMenu'),
  Dashboard: componentLoader.add('Dashboard', './components/Dashboard'),
};

export { componentLoader, Components };
