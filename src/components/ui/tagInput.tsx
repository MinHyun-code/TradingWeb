import React, { useState } from 'react';

interface TagInputProps {
  placeholder?: string;
  onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ placeholder = '태그', onChange }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault(); // 엔터 눌렀을 때 폼 제출 방지

      const trimmedValue = inputValue.trim();

      // 태그가 이미 존재하는지 확인
      if (!tags.includes(trimmedValue)) {
        const newTags = [...tags, trimmedValue];
        setTags(newTags);
        setInputValue('');
        onChange(newTags); // 상위 컴포넌트로 태그 리스트 전달
      } else {
        // 중복 태그 알림 (예: alert로 알리기)
        alert(`"${trimmedValue}"는 이미 존재하는 태그입니다.`);
        setInputValue('');
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange(newTags);
  };

  return (
    <div className='mb-3'>
    
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={addTag} // Enter 키로 태그 추가
        className="mb-3 h-9 outline-none flex-grow p-2 w-full rounded-md border border-input dark:border-slate-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div className="flex items-center flex-wrap p-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center text-sm bg-slate-900 text-white px-2 py-1 rounded-lg mr-2 mb-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-white focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
