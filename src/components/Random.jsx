import React, { useState } from 'react';

export default function CommentSection() {
    const [comments, setComments] = useState([
        {
            id: 1,
            author: "Code4fun",
            avatar: "https://cdn.dribbble.com/userupload/15281012/file/original-18b6e4ae4469cb15d8c5dad00faa4430.png?resize=400x397",
            date: "Jun. 24, 2024",
            text: " Hello Users Explore our website! All feedbacks are allowed here",
            replies: []
        }
    ]);
    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyTo, setReplyTo] = useState(null);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        const newCommentData = {
            id: comments.length + 1,
            author: "New User",
            avatar: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            }),
            text: newComment,
            replies: []
        };

        setComments([...comments, newCommentData]);
        setNewComment('');
    };

    const handleReplyChange = (e) => {
        setReplyText(e.target.value);
    };

    const handleReplySubmit = (e, commentId) => {
        e.preventDefault();
        if (replyText.trim() === '') return;

        const newReply = {
            id: new Date().getTime(),
            author: "New User",
            avatar: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            }),
            text: replyText
        };

        setComments(comments.map(comment =>
            comment.id === commentId
                ? { ...comment, replies: [...comment.replies, newReply] }
                : comment
        ));
        setReplyText('');
        setReplyTo(null);
    };

    const handleReplyButtonClick = (commentId) => {
        setReplyTo(replyTo === commentId ? null : commentId);
    };

    return (
        <div>
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion</h2>
                    </div>
                    <form className="mb-6" onSubmit={handleCommentSubmit}>
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea
                                id="comment"
                                rows="6"
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={handleCommentChange}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        >
                            Post comment
                        </button>
                    </form>
                    {comments.map(comment => (
                        <div key={comment.id} className="mb-6">
                            <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-3">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                            <img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src={comment.avatar}
                                                alt={comment.author}
                                            />
                                            {comment.author}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <time dateTime={comment.date} title={comment.date}>
                                                {comment.date}
                                            </time>
                                        </p>
                                    </div>
                                </footer>
                                <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
                                <div className="flex items-center mt-4 space-x-4">
                                    <button
                                        type="button"
                                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                                        onClick={() => handleReplyButtonClick(comment.id)}
                                    >
                                        <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                        </svg>
                                        Reply
                                    </button>
                                </div>
                                {replyTo === comment.id && (
                                    <form className="mt-4" onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                            <label htmlFor={`reply-${comment.id}`} className="sr-only">Your reply</label>
                                            <textarea
                                                id={`reply-${comment.id}`}
                                                rows="3"
                                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                                placeholder="Write a reply..."
                                                value={replyText}
                                                onChange={handleReplyChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                        >
                                            Post reply
                                        </button>
                                    </form>
                                )}
                                {comment.replies.length > 0 && (
                                    <div className="ml-6 lg:ml-12 mt-4">
                                        {comment.replies.map(reply => (
                                            <article key={reply.id} className="p-6 mb-3 text-base bg-white rounded-lg dark:bg-gray-900">
                                                <footer className="flex justify-between items-center mb-2">
                                                    <div className="flex items-center">
                                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                            <img
                                                                className="mr-2 w-6 h-6 rounded-full"
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
