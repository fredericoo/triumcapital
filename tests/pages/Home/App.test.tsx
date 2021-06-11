import { render } from '@testing-library/react';
import Home from 'app/pages/index';
// import { createRouter } from 'next/router';
// import { mockDocument } from './mockDocument';

/**
 * @jest-environment jsdom
 */

// jest.mock('next/image', () => ({
//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   __esModule: true,
//   default: (props: any) => {
//     // eslint-disable-next-line jsx-a11y/alt-text
//     return <img {...props} />;
//   },
// }));

describe('Home page', () => {
  it('does not render without data', () => {
    const { container } = render(<Home doc={undefined} posts={[]} />);
    expect(container.innerHTML).toBeNull;
  });
  // it("renders page when supplied with data", () => {
  // 	const { container } = render(<Home doc={mockDocument} posts={[]} />);
  // 	expect(container.innerHTML).toBeTruthy();
  // });
});
