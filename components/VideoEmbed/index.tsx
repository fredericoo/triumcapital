import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

type VideoEmbedProps = {
  html: string;
};
const VideoWrapper = styled(Box)`
  position: relative;
  height: 0px;
  padding-bottom: 56.18%;
  & > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
`;
const VideoEmbed: React.FC<VideoEmbedProps> = ({ html }) => <VideoWrapper dangerouslySetInnerHTML={{ __html: html }} />;

export default VideoEmbed;
