import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const FeedAddForm = () => {
  const [subject, setSubject] = useState("");
  const [contents, setContents] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);

  return (
    <div className="flex w-full flex-col justify-center space-y-6">
      <Input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="제목"
      />
      <Input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="태그"
      />
      <Textarea
        placeholder="Tell us a little bit about yourself"
        className="resize-none h-96 sm:h-80"
      />
      <Button className="mt-5 w-full">등록</Button>
    </div>
  );
};

export default FeedAddForm;
