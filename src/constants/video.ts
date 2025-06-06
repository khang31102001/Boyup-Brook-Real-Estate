

// Video imports
import video_river from '../public/video/video-river.mp4';
import video2 from '../public/video/video-2.mp4';

import horse from '../public/video/horse.mp4';
import horse2 from '../public/video/horse2.mp4';
import horse3 from '../public/video/horse3.mp4';
// import thumb from '../public/img/thumb.jpg';
// import property_thumb from '../public/img/property-thumb.jpg';

// Video constants
export const videos = {
  river: video_river,
  property: video2,
  horse: horse,
  horse2: horse2,
  horse3: horse3,
};

// export const videoThumbs = {
//   river: thumb,
//   property: property_thumb,
// };

export const videoData = [
  {
    id: 'river',
    src: videos.river,
    // thumb: videoThumbs.river,
    title: 'River Frontage',
    description: 'Explore the beautiful Blackwood River frontage'
  },
  {
    id: 'property',
    src: videos.property,
    // thumb: videoThumbs.property,
    title: 'Property Overview',
    description: 'A comprehensive tour of the entire property'
  },
  {
    id: 'horse',
    src: videos.horse,
    title: 'Horse Riding',
    description: 'Explore the beautiful Blackwood River frontage'
  },
  {
    id: 'horse2',
    src: videos.horse2,
    title: 'Horse Riding',
    description: 'Explore the beautiful Blackwood River frontage'
  },
  {
    id: 'horse3',
    src: videos.horse3,
    title: 'Horse Riding',
    description: 'Explore the beautiful Blackwood River frontage'
  }
];

// Export all videos as a single object
const allVideos = {
  data: videoData,
  sources: videos,
//   thumbnails: videoThumbs
};

export default allVideos;
