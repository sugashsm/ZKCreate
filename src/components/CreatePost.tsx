import React, { useState } from 'react';
import { useCreateFreeContent } from '../hooks/useCreateFreeContent';
import { uploadFileToIPFS } from '../ipfsService'; // Import IPFS service

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState(''); // Title of the content
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [username, setUsername] = useState(''); // Username of creator
  const [creatorImage, setCreatorImage] = useState(''); // Creator's profile image URL or IPFS hash
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !media || !username || !creatorImage) {
      alert('Please fill in all fields and upload media');
      return;
    }

    try {
      setIsUploading(true);

      // Step 1: Upload media file to IPFS
      const ipfsHash = await uploadFileToIPFS(media);
      if (!ipfsHash) {
        alert('Failed to upload media to IPFS');
        setIsUploading(false);
        return;
      }

      // Step 2: Extract the file extension from the uploaded media
      const fileExtension = media.name.split('.').pop()?.toLowerCase() || '';

      // Step 3: Call the `createFreeContent` hook to create the content on-chain
      const createFreeContent = useCreateFreeContent(
        title,
        ipfsHash,
        fileExtension,
        username,
        creatorImage
      );

      await createFreeContent(); // Call the function

      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post here"
        required
      />
      <input
        type="file"
        onChange={(e) => setMedia(e.target.files?.[0] || null)}
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        required
      />
      <input
        type="text"
        value={creatorImage}
        onChange={(e) => setCreatorImage(e.target.value)}
        placeholder="Enter creator image URL or IPFS hash"
        required
      />
      <button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Post'}
      </button>
    </form>
  );
};

export default CreatePost;
