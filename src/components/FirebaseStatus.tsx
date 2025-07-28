import React, { useState, useEffect } from 'react';
import { getSubscriberCount } from '../lib/firebase';

const FirebaseStatus: React.FC = () => {
  const [subscriberCount, setSubscriberCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const count = await getSubscriberCount();
        setSubscriberCount(count);
      } catch (error) {
        console.error('Error fetching subscriber count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriberCount();
  }, []);

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
      <div className="flex items-center gap-2 text-orange-700 text-sm">
        <i className="bi bi-database-fill-check"></i>
        <span className="font-medium">Connected to Firebase</span>
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="text-orange-600 text-xs">
          Your subscription will be securely stored in Firestore
        </p>
        {!isLoading && (
          <div className="flex items-center gap-1 text-orange-600 text-xs">
            <i className="bi bi-people-fill"></i>
            <span>{subscriberCount} subscribers</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirebaseStatus;
