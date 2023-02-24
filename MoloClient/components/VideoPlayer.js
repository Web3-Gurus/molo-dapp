import React, { Component } from 'react';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.videoLink = `https://ipfs.io/ipfs/${props.hash}`;

  }


  render() {
    return (
      <Plyr
        source={{
          type: 'video',
          title: 'Example title',
          sources: [
            {
              src: this.videoLink,
              type: 'video/mp4',
            },
          ],
        }}
        options={{
          autoplay: true,
        }}
        autoPlay={true}
      />
    );
  }
}


// import Plyr from 'plyr-react'
// import 'plyr-react/plyr.css'

// export default function Player({ hash }) {
//   let videoLink = `https://ipfs.io/ipfs/${hash}`
//   return (
//     <Plyr
//       source={{
//         type: 'video',
//         title: 'Example title',
//         sources: [
//           {
//             src: videoLink,
//             type: 'video/mp4',
//           },
//         ],
//       }}
//       options={{
//         autoplay: true,
//       }}
//       autoPlay={true}
//     />
//   )
// }
