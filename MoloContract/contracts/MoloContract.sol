// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VideoPlatform {
    // Define a Video struct to store the video information
    struct Video {
        uint256 id;
        bytes32 contentHash;
        string title;
        string description;
        string location;
        string category;
        bytes32 thumbnailHash;
        string date;
        address author;
    }

    // Define a mapping to store the videos by their ID
    mapping(uint256 => Video) public videos;

    // Define a mapping to store the video IDs uploaded by a user
    mapping(address => uint256[]) public userVideos;

    // Define the maximum number of videos a user can upload
    uint256 public maxVideosPerUser = 10;

    // Define a counter to generate new unique IDs for the videos
    uint256 public numberOfVideos;

    // Define an event to emit when a new video is uploaded
    event UploadedVideo(
        uint256 indexed id,
        bytes32 contentHash,
        string title,
        string description,
        string location,
        string category,
        bytes32 thumbnailHash,
        string date,
        address indexed author
    );

    // Define an event to emit when a video is deleted
    event DeletedVideo(
        uint256 indexed id,
        address author,
        bytes32 contentHash
    );

    // A function to upload a new video to the platform
    function uploadVideo(
        bytes32 _videoHash,
        string memory _title,
        string memory _description,
        string memory _location,
        string memory _category,
        bytes32 _thumbnailHash,
        string memory _date
    ) public {
        // Validate inputs
        require(_videoHash != bytes32(0), "Video hash cannot be empty");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(msg.sender != address(0), "Invalid sender address");
        require(validateDate(_date), "Invalid date format");
        require(
            bytes(_description).length <= 500,
            "Description cannot exceed 500 characters"
        );
        require(
            bytes(_location).length <= 50,
            "Location cannot exceed 50 characters"
        );
        require(
            bytes(_category).length <= 20,
            "Category cannot exceed 20 characters"
        );

        // Verify ownership
        require(
            userVideos[msg.sender].length < maxVideosPerUser,
            "Maximum videos uploaded"
        );

        // Increment the video counter to generate a new unique ID for the video
        numberOfVideos++;

        // Create a new Video struct with the given parameters and add it to the videos mapping
        videos[numberOfVideos] = Video(
            numberOfVideos,
            _videoHash,
            _title,
            _description,
            _location,
            _category,
            _thumbnailHash,
            _date,
            msg.sender
        );

        // Add the video ID to the userVideos mapping for the uploader
        userVideos[msg.sender].push(numberOfVideos);

        // Emit an event indicating that a new video has been uploaded
        emit UploadedVideo(
            numberOfVideos,
            _videoHash,
            _title,
            _description,
            _location,
            _category,
            _thumbnailHash,
            _date,
            msg.sender
        );
    }

    // A function to validate the date format
    function validateDate(string memory _date) private pure returns (bool) {
        bytes memory d = bytes(_date);
        if (d.length != 10) return false;
        if (d[4] != 0x2D || d[7] != 0x2D) return false;
        for (uint256 i = 0; i < d.length; i++) {
            if (i == 4 || i == 7) continue;
            if (d[i] < 0x2D || d[i] > 0x39) return false;
        }
        return true;
    }



    // A function to delete a video by ID
    function deleteVideo(uint256 _videoId) public {
        // Get the video from the videos mapping
        Video storage video = videos[_videoId];

        // Ensure the video exists and the caller is the author
        require(video.id == _videoId, "Video does not exist");
        require(video.author == msg.sender, "Only the video author can delete the video");

        // Remove the video ID from the userVideos mapping for the author
        uint256[] storage authorVideos = userVideos[msg.sender];
        for (uint256 i = 0; i < authorVideos.length; i++) {
            if (authorVideos[i] == _videoId) {
                authorVideos[i] = authorVideos[authorVideos.length - 1];
                authorVideos.pop();
                break;
            }
        }

        // Remove the video from the videos mapping
        delete videos[_videoId];

        // Emit an event indicating the video has been deleted
        emit DeletedVideo(_videoId, video.author, video.contentHash);
    }



}
