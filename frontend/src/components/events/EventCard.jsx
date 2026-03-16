import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import eventService from '../../services/eventService';

const EventCard = ({ event }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(event.likedBy ? event.likedBy.length : 0);
  const [liking, setLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    event.likedBy?.some((id) => id === user?.id || id === user?._id) || false
  );
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge based on event date
  const getStatusBadge = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (eventDate < today) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Completed
        </span>
      );
    } else if (eventDate >= today && eventDate < tomorrow) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Upcoming
        </span>
      );
    }
  };

  const handleLike = async () => {
    if (!user || hasLiked || liking) return;

    try {
      setLiking(true);
      const res = await eventService.likeEvent(event._id);
      const newLikes =
        res?.data?.likes ??
        (Array.isArray(res?.data?.likedBy) ? res.data.likedBy.length : likes + 1);
      setLikes(newLikes);
      setHasLiked(true);
    } catch (err) {
      // Optionally handle error (toast/snackbar)
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow-md hover:shadow-lg rounded-xl transition-shadow duration-200">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {event.title}
            </h3>
            {event.category && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                {event.category}
              </span>
            )}
          </div>
          {getStatusBadge()}
        </div>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          {event.description.length > 100 
            ? `${event.description.substring(0, 100)}...` 
            : event.description}
        </p>
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{event.location}</span>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span>{event.participants ? `${event.participants.length} / ${event.capacity} registered` : `0 / ${event.capacity} registered`}</span>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleLike}
              disabled={!user || hasLiked || liking}
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                hasLiked
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-rose-50 hover:text-rose-700'
              } ${(!user || liking) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <svg
                className={`h-4 w-4 mr-1 ${hasLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              {hasLiked ? 'Liked' : 'Like'}
            </button>
            <span className="text-gray-500 text-xs">
              {likes} like{likes === 1 ? '' : 's'}
            </span>
          </div>
          <div className="flex space-x-4">
            <Link to={`/events/${event._id}`} className="font-medium text-indigo-600 hover:text-indigo-500">
              View details
            </Link>
            <Link to={`/leaderboard/${event._id}`} className="font-medium text-indigo-600 hover:text-indigo-500">
              View leaderboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    category: PropTypes.string,
    likedBy: PropTypes.array,
  }).isRequired,
};

export default EventCard;