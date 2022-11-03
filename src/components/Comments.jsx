import { useEffect, useState } from "react";
import ApiRequests from "./ApiRequests";

const Comments = ({id}) => { 
    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        ApiRequests.getComments(id).then((res) => {
          setComments(res.data.comment);
          setIsLoading(false);
        });
    }, [])
      if (isLoading) return <>loading...</>;
    return (
      <>
        <h2>comments: </h2>
        {!comments ? (
          <></>
        ) : (
          comments.map((comment) => {
            return (
              <div key={comment.comment_id} className="item">
                <ul>
                  <li>
                    <strong>author: </strong> {comment.author}
                  </li>
                  <li>
                    <strong>votes: </strong>
                    {comment.votes}
                  </li>
                  <li>
                    <strong>created at: </strong> {comment.created_at}
                  </li>
                  <br />
                  <li>{comment.body}</li>
                </ul>
              </div>
            );
          })
        )}
      </>
    );
}

export default Comments;