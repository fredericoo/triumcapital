import { render, fireEvent } from '@testing-library/react';
import { MenuItem } from './types';
import NavbarLarge from './NavbarLarge';
import NavbarSmall from './NavbarSmall';

const generateMenuItem = (): MenuItem => ({
  label: Math.random().toString(36).substring(7),
  link: {
    id: '',
    type: 'doc',
    href: '',
    tags: [],
    slugs: [],
    alternate_languages: [],
    uid: Math.random().toString(36).substring(12),
    first_publication_date: '',
    last_publication_date: '',
    data: {},
  },
});
const mockMenu = new Array(3).fill(0).map(generateMenuItem);

describe('<NavbarLarge />', () => {
  it('renders menu items', () => {
    const { getByText } = render(<NavbarLarge menu={mockMenu} currentPath="/" />);
    expect(getByText(mockMenu[0].label)).toBeTruthy();
    expect(getByText(mockMenu[1].label)).toBeTruthy();
    expect(getByText(mockMenu[2].label)).toBeTruthy();
  });
});
describe('<NavbarSmall />', () => {
  it('renders menu toggler button', () => {
    const { getByTestId } = render(<NavbarSmall menu={mockMenu} currentPath="/" />);
    expect(getByTestId('toggle-menu')).toBeTruthy();
  });
  it('does not render menu items when menu is closed', () => {
    const { queryByText } = render(<NavbarSmall menu={mockMenu} currentPath="/" />);
    expect(queryByText(mockMenu[0].label)).toBeNull();
    expect(queryByText(mockMenu[1].label)).toBeNull();
    expect(queryByText(mockMenu[2].label)).toBeNull();
  });
  it('renders menu items when menu is open', () => {
    const { getByTestId, getByText } = render(<NavbarSmall menu={mockMenu} currentPath="/" />);
    fireEvent.click(getByTestId('toggle-menu'));
    expect(getByText(mockMenu[0].label)).toBeTruthy();
    expect(getByText(mockMenu[1].label)).toBeTruthy();
    expect(getByText(mockMenu[2].label)).toBeTruthy();
  });
});
