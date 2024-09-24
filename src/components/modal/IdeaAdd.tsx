import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useIdeaAdd, boardAddReq } from "@/hooks/idea/ideaApi";

const IdeaAddForm = () => {
  const { ideaAddApi } = useIdeaAdd();

  const [subject, setSubject] = useState("");
  const [contents, setContents] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);

  // idea 게시글 생성
  const ideaAdd = async () => {
    const param: boardAddReq = {
      subject: subject,
      contents: contents,
      tagList: [],
    };

    await ideaAddApi(param);
  };

  return (
    <div className="flex w-full flex-col justify-center space-y-6">
      <Input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="제목"
      />
      <Input placeholder="태그" />
      <Textarea
        placeholder="Tell us a little bit about yourself"
        className="resize-none h-96 sm:h-80"
        onChange={(e) => setContents(e.target.value)}
      />
      <Button className="mt-5 w-full" onClick={ideaAdd}>
        등록
      </Button>
    </div>
  );
};

export default IdeaAddForm;
