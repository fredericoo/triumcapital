import { render } from '@testing-library/react';
import HomeScreen from '@/screens/home';

describe('Home page', () => {
  it('does not render without data', () => {
    const { container } = render(<HomeScreen data={undefined} posts={[]} />);
    expect(container.innerHTML).toBeNull;
  });
});
