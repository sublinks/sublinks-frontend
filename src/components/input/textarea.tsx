'use client';

import React, { useState } from 'react';
import MDEditor, { ICommand } from '@uiw/react-md-editor';
import { BodyText } from '../text';

interface PreviewCommandToolProps {
  label: string;
  onClick: () => void;
}

interface MarkdownTextareaProps {
  label: string;
  id: string;
  initialValue?: string;
}

// Important classes for this and the textarea component
// are necessary to override MDEditor's default styles
const PreviewCommandTool = ({ label, onClick }: PreviewCommandToolProps) => (
  <button type="button" onClick={onClick} className="absolute bottom-0 right-0 !h-24 w-80 !bg-secondary !rounded-tl-md group z-10">
    <BodyText className="font-bold group-hover:text-hover-md-editor group-focus:text-hover-md-editor dark:text-gray-600">{label}</BodyText>
  </button>
);

const MarkdownTextarea = ({
  label, id, initialValue
}: MarkdownTextareaProps) => {
  const [value, setValue] = useState(initialValue || '**Hello world!!!**');
  const [showPreview, setShowPreview] = useState(false);

  const previewCommand = showPreview ? 'Edit' : 'Preview';
  const homemadePreviewCommand: ICommand = {
    name: previewCommand,
    keyCommand: 'preview',
    position: 'right',
    render: () => (
      <PreviewCommandTool label={previewCommand} onClick={() => setShowPreview(!showPreview)} />
    )
  };

  const handleOnChange = (mdValue: string | undefined) => {
    const newValue = mdValue || '';
    setValue(newValue);
  };

  return (
    <div>
      <label htmlFor={id}>
        <BodyText>{label}</BodyText>
      </label>
      <MDEditor
        id={id}
        value={value}
        onChange={handleOnChange}
        autoFocus={false}
        preview={showPreview ? 'preview' : 'edit'}
        textareaProps={{
          autoCapitalize: 'none'
        }}
        defaultTabEnable
        visibleDragbar={false}
        extraCommands={[homemadePreviewCommand]} // Replace built-in preview options
        className="!border !border-gray-300 dark:!border-gray-900"
      />
    </div>
  );
};

export default MarkdownTextarea;
