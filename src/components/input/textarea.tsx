'use client';

import React, { useState } from 'react';
import MDEditor, { ICommand } from '@uiw/react-md-editor';
import { LinkText } from '../text';

const MarkdownTextarea = () => {
  const [value, setValue] = useState('**Hello world!!!**');
  const [showPreview, setShowPreview] = useState(false);

  const previewCommand = showPreview ? 'Edit' : 'Preview';
  const homemadePreviewCommand: ICommand = {
    name: previewCommand,
    keyCommand: 'preview',
    position: 'right',
    icon: <button type="button" className="group absolute right-0 bottom-0 w-80 !h-40 z-10 !bg-secondary dark:!bg-secondary-dark !rounded-tl" onClick={() => setShowPreview(!showPreview)}><LinkText className="group-hover:text-hover-link dark:group-hover:text-hover-link-dark">{previewCommand}</LinkText></button>
  };

  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={newValue => setValue(newValue || '')}
        autoFocus={false}
        preview={showPreview ? 'preview' : 'edit'}
        textareaProps={{
          autoCapitalize: 'none'
        }}
        visibleDragbar={false}
        extraCommands={[homemadePreviewCommand]} // Hide built-in preview options
      />
      <button type="button" onClick={() => setShowPreview(!showPreview)}>Edit / Preview</button>
      <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
    </div>
  );
};

export default MarkdownTextarea;
