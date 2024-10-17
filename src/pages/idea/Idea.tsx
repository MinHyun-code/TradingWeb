import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useIdeaList, boardData, listReq, useIdeaAdd, boardAddReq } from "@/hooks/idea/ideaApi";
import { useFeedList, feedData } from "@/hooks/idea/feedApi";
import IdeaCard from "@/components/card/IdeaCard";
import FeedCard from "@/components/card/FeedCard";
import { Input } from "@/components/ui/input";
import LeftNavbar from "@/components/navbar/LeftNavbar";
import { useParams } from "react-router-dom";
import AutoResizeTextarea from "@/components/ui/autoResizeTextarea";
import TagInput from "@/components/ui/tagInput";
import { useAuth } from "@/router/AuthContext";

const Idea = () => {

  const { isAuthenticated } = useAuth();

  /* 조회 로직 */
  const { ideaListApi } = useIdeaList();
  const { feedListApi } = useFeedList();

  const { id } = useParams<{ id: string }>();
  const [ideaList, setIdeaList] = useState<boardData[]>([]); // 받아온 데이터 저장
  const [feedList, setFeedList] = useState<feedData[]>([]); // 받아온 데이터 저장
  const [page, setPage] = useState<number>(1);  // 현재 페이지 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true);  // 더 불러올 데이터가 있는지 확인
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [urlId, setUrlId] = useState<string|undefined>(id);
  const [ideaKeyword, setIdeaKeyword] = useState<string>("");

  // 데이터 요청 함수
  const loadMoreData = useCallback(async (id:string|undefined) => {
    try {
      setLoading(true);
      const param: listReq = {
        page: page,
        pageSize: 10,
      };

      let newIdeaItems: boardData[] = [];
      let newFeedItems: feedData[] = [];
      
      // idea 조회
      if (id === undefined) {

        if(ideaKeyword != "") {
          param.keyword = ideaKeyword;
          setIdeaList([]);
        }

        newIdeaItems = await ideaListApi(param);
        setIdeaList(prevData => [...prevData, ...newIdeaItems]);

        // 더 이상 데이터가 없으면 hasMore를 false로 설정
        if (newIdeaItems.length < 10) {
          setHasMore(false);
        }
      } 
      // feed 조회
      else if (id === "feed") {
        param.type = "COIN";
        param.code = "BTC";
        newFeedItems = await feedListApi(param);
        setFeedList(prevData => [...prevData, ...newFeedItems]);

        // 더 이상 데이터가 없으면 hasMore를 false로 설정
        if (newFeedItems.length < 10) {
          setHasMore(false);
        }
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, ideaKeyword]);

  // IntersectionObserver로 트리거 감지
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);  // 페이지 증가
        
        // 트리거 요소에 대한 관찰 중지 (데이터가 로드되면 다시 관찰)
        if (observerRef.current) {
          observerRef.current.unobserve(target.target);
        }
        
      }
    },
    [loading, hasMore]
  );

  // 트리거 요소가 감지되면 IntersectionObserver가 실행됨
  useEffect(() => {
    const target = document.getElementById("scroll-trigger");

    // IntersectionObserver 설정
    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null, // 뷰포트를 기준으로
      rootMargin: "0px",
      threshold: 1.0, // 100% 보여졌을 때 트리거
    });

    if (target) {
      observerRef.current.observe(target);  // 트리거 요소 관찰 시작
    }

    return () => {
      if (observerRef.current && target) {
        observerRef.current.unobserve(target); // 언마운트 시 관찰 해제
      }
    };
  }, [observerCallback]);

  // 검색
  const searchData = () => {
    scrollTop();
    if(page === 1) {
      loadMoreData(id);
    }
    else {
      setPage(1);
    }
  }

  // Enter Key 이벤트
  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      loadMoreData(id);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,    // 스크롤을 위로 설정
      behavior: 'smooth'  // 부드럽게 스크롤
    });
  }


  // ID가 변경될 때 실행
  useEffect(() => {
    if (urlId !== id) {
      scrollTop();
      setIdeaList([]);
      setFeedList([]);
      setUrlId(id); // URL ID 업데이트
      setIdeaKeyword("");
      
      // 페이지가 1이 아니면 페이지를 1로 설정하고 로딩을 멈춤
      if (page !== 1) {
        setPage(1);
        return;  // 페이지를 1로 설정한 후 즉시 loadMoreData 호출을 막음
      }
    }
    
    // 페이지가 1일 때만 데이터를 로드
    if (page === 1 && urlId === id) {
      loadMoreData(id);
    }
  }, [id, urlId, page]); // id, urlId, page가 변경될 때 실행

  // 페이지가 변경될 때 실행
  useEffect(() => { 
    // 첫 입장 시 이미 page가 1이면 데이터를 로드하지 않음 (위에서 처리됨)
    if (page !== 1) {
      loadMoreData(id);
    }
  }, [page]); // page만 의존성으로 설정

  /* 저장 로직 */

  // issue 저장 변수
  const [subject, setSubject] = useState("");
  const [contents, setContents] = useState("");
  const [tagList, setTagList] = useState<string[] | null>(null);

  const { ideaAddApi } = useIdeaAdd();

  // idea 게시글 생성
  const ideaAdd = async () => {
    const param: boardAddReq = {
      subject: subject,
      contents: contents,
      tagList: tagList,
    };

    await ideaAddApi(param);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <div className="sm:w-[1300px] min-w-80 rounded-lg">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-3/12 sm:flex sm:block sm:mr-3 flex-row-reverse">
              <div className="sm:w-10/12">
                <LeftNavbar />
              </div>
            </div>
            <div className="sm:w-6/12 w-screen border sm:rounded-2xl min-h-screen">
              <div className="pt-10">
                {isAuthenticated ? (
                  <div className="border-t border-b flex justify-center">
                    <div className="mt-8 mb-8 w-4/5">
                      <Input
                        placeholder="제목"
                        className="mb-5"
                        onChange={(e) => setSubject(e.target.value)}
                      />
                      <TagInput onChange={setTagList}/>
                      <AutoResizeTextarea value={contents} onChange={setContents}/>
                      <div className="flex justify-end mt-5">
                        <Button onClick={ideaAdd}>Post</Button>
                      </div>
                    </div>
                  </div>
                ) : null}
                
                {id === undefined && ideaList && (
                  ideaList.length > 0 ? (
                  ideaList.map((item, index) => (
                    <IdeaCard key={index} item={item} />
                  ))
                  ) : (
                    <p>데이터가 없습니다.</p>
                  )
                )}

                {id === "feed" && feedList && (
                  feedList.length > 0 ? (
                  feedList.map((item, index) => (
                    <FeedCard key={index} item={item} />
                  ))
                  ) : (
                    <p>데이터가 없습니다.</p>
                  )
                )}
              </div>
            </div>
            <div className="sm:w-3/12 hidden sm:flex ml-3 justify-evenly">
              <div className="fixed">
              {id === undefined ? (
                <div className="flex">
                  <Input 
                    placeholder="search..." 
                    value={ideaKeyword} 
                    onChange={(e) => setIdeaKeyword(e.target.value)}
                    onKeyDown={handleEnterPress}
                  />
                  <Button onClick={searchData}>검색</Button>
                </div>
              ) : id === "feed" ? (
                <div className="flex">
                  {/* <Input 
                    placeholder="search..." 
                    value={ideaKeyword} 
                    onChange={(e) => setIdeaKeyword(e.target.value)}
                    onKeyDown={handleEnterPress}
                  />
                  <Button onClick={searchData}>검색</Button> */}
                </div>
              ) : (<div></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 스크롤이 끝에 다다를 때 이 요소가 감지됨 */}
      <div id="scroll-trigger" style={{ height: '20px', backgroundColor: 'transparent' }} />
    </>
  );
};

export default Idea;
