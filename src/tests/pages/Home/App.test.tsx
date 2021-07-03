import { render } from '@testing-library/react';
import Home from '@/pages';

describe('Home page', () => {
  it('does not render without data', () => {
    const { container } = render(<Home doc={undefined} posts={[]} />);
    expect(container.innerHTML).toBeNull;
  });
});
