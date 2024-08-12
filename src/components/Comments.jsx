import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebase';

export default function Comments() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const { isLoggedIn, currentUser, getUser, getImageUrl, handleComment, handleReply, getComments, deleteComment, handleDeleteCommentF } = useFirebase();
    const [profileUrl, setProfileUrl] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            const comments = await getComments();
            setComments(comments);
        };

        fetchComments();
    }, [getComments]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        const newCommentData = {
            id: `${currentUser.uid}+${new Date().getTime()}`,
            author: user.name,
            avatar: user.imageUrl,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            }),
            text: newComment,
            userId: currentUser.uid,
            replies: []
        };

        await handleComment(newCommentData);
        setComments([...comments, newCommentData]);
        setNewComment('');
    };

    const handleReplyChange = (e) => {
        setReplyText(e.target.value);
    };

    const handleReplySubmit = async (e, commentId) => {
        e.preventDefault();
        if (replyText.trim() === '') return;

        const newReply = {
            id: `reply/${currentUser.uid}+${new Date().getTime()}`,
            author: user.name,
            avatar: user.imageUrl,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            }),
            text: replyText,
            userId: currentUser.uid
        };

        await handleReply(commentId, newReply);

        const updatedComments = comments.map(comment =>
            comment.id === commentId
                ? { ...comment, replies: [...comment.replies, newReply] }
                : comment
        );

        setComments(updatedComments);
        setReplyText('');
        setReplyTo(null);
    };

    const handleReplyButtonClick = (commentId) => {
        setReplyTo(replyTo === commentId ? null : commentId);
    };

    const handleDeleteComment = async (commentId, comment) => {
        handleDeleteCommentF(commentId)
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    const handleDeleteReply = async (commentId, replyId) => {
        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                const updatedReplies = comment.replies.filter(reply => reply.id !== replyId);
                return { ...comment, replies: updatedReplies };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const fetchUserDetails = async () => {
        if (isLoggedIn && currentUser) {
            const userUID = currentUser.uid;
            const userSnapshot = await getUser();
            const users = userSnapshot.docs;

            for (let snapshot of users) {
                const userData = snapshot.data();

                if (userData.userID === userUID) {
                    const imageUrl = await getImageUrl(userData.coverPic);
                    setUser({
                        name: userData.userName,
                        email: userData.userEmail,
                        imageUrl
                    });
                    setProfileUrl(imageUrl);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [isLoggedIn, currentUser, getUser, getImageUrl]);

    return (
        <div className="bg-[#1c1c1c] py-8 lg:py-16 antialiased">
            <section className=" bg-[#1c1c1c] py-8 lg:py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">Comments</h2>
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <div className="py-2 px-4 p-2 mb-4 rounded-lg rounded-t-lg bg-[#262626ff]">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea id="comment" rows="6" value={newComment} onChange={handleCommentChange}
                                className="px-0 w-full text-sm  border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400  bg-[#262626ff] rounded-md"
                                placeholder="Write a comment..." required></textarea>
                        </div>
                        <button type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Post comment
                        </button>
                    </form>
                    {comments.map(comment => (
                        <div key={comment.id} className="space-y-4 mb-4">
                            <article className="p-6 mb-6 text-base rounded-lg bg-[#1c1c1c]">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                            <img className="mr-2 w-6 h-6 rounded-full"
                                                src={comment.avatar} alt={comment.author} />
                                            {comment.author}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <time dateTime={comment.date} title={comment.date}>{comment.date}</time>
                                        </p>
                                    </div>

                                </footer>
                                <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
                                <div className="flex items-center mt-4 space-x-4">
                                    <button type="button" onClick={() => handleReplyButtonClick(comment.id)}
                                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                        <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M17 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2m2-4h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z">
                                            </path>
                                        </svg>
                                        Reply
                                    </button>
                                    {currentUser.uid === comment.userId && (
                                        <button type="button" onClick={() => handleDeleteComment(comment.id, comment)}
                                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                            <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7m5-3h4m-7 3h10M10 11v6m4-6v6"></path>
                                            </svg>
                                            Delete
                                        </button>
                                    )}

                                </div>
                                {replyTo === comment.id && (
                                    <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mt-4">
                                        <div className=" p-2 mb-4 rounded-lg rounded-t-lg bg-[#262626ff]">
                                            <label htmlFor="reply" className="sr-only">Your reply</label>
                                            <textarea id="reply" rows="4" value={replyText} onChange={handleReplyChange}
                                                className="p-5 w-full text-sm  border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400  bg-[#333333ff] rounded-md"
                                                placeholder="Write a reply..." required></textarea>
                                            <button type="submit"
                                                className="inline-flex items-center py-2.5 px-4 mt-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                Post reply
                                            </button>
                                        </div>
                                    </form>
                                )}
                                {comment.replies.length > 0 && (
                                    <div className="mt-4 space-y-4">
                                        {comment.replies.map(reply => (
                                            <article key={reply.id} className="p-6 text-base bg-[#1c1c1c] rounded-lg">
                                                <footer className="flex justify-between items-center mb-2">
                                                    <div className="flex items-center">
                                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                            <img className="mr-2 w-6 h-6 rounded-full"
                                                                src={reply.avatar}
                                                                alt={reply.author}
                                                            />
                                                            {reply.author}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            <time dateTime={reply.date} title={reply.date}>
                                                                {reply.date}
                                                            </time>
                                                        </p>
                                                    </div>
                                                    {currentUser.uid === reply.userId && (
                                                        <button onClick={() => handleDeleteReply(comment.id, reply.id)}
                                                            className="text-sm text-red-500 hover:underline dark:text-red-400">
                                                            Delete
                                                        </button>
                                                    )}
                                                </footer>
                                                <p className="text-gray-500 dark:text-gray-400">{reply.text}</p>
                                            </article>
                                        ))}
                                    </div>
                                )}
                            </article>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
