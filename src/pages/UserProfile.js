import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserHeader from '../components/User/UserHeader';
import UserMain from '../components/User/UserMain';
import requestData from '../utils/requestData';
import { USER_INFO_URL } from '../utils/consts';
import classes from './UserProfile.module.css';
import loaderClasses from '../UI/icons/Loader/LoaderWrapper.module.css';
import Loader from '../UI/icons/Loader/Loader';
import { MediaContext } from '../store/contexts/MediaContext';

const UserProfile = () => {
  const { isMobile } = useContext(MediaContext);
  const location = useLocation();
  const user = location.pathname.slice(2);
  const [userInfo, setUserInfo] = useState([]);
  const [isInfoLoading, setIsInfoLoading] = useState(false);

  useEffect(() => {
    setIsInfoLoading(true);
    requestData({
      url: USER_INFO_URL,
      name: user,
      responseData: userInfo,
      setResponseData: setUserInfo,
      setIsLoading: setIsInfoLoading,
    });
  }, [setUserInfo]);

  /** For broken UserFeed API start */
  // const [userFeed, setUserFeed] = useState([])
  // const [isFeedLoading, setIsFeedLoading] = useState(false)
  // useEffect(() => {
  //     setIsInfoLoading(true);
  //     requestData({
  //         url: USER_FEED_URL,
  //         name: user,
  //         responseData: userFeed,
  //         setResponseData: setUserFeed,
  //         setIsLoading: setIsFeedLoading
  //     });
  // }, [setUserFeed])
  /** For broken UserFeed API start */

  return (
    <div className={isMobile ? `${classes.userLayout} ${classes.userLayoutMobile}` : classes.userLayout}>
      <div
        className={
          isMobile ? `${classes.userLayoutContent} ${classes.userLayoutContentMobile}` : classes.userLayoutContent
        }
      >
        {isInfoLoading ? (
          <div className={`${loaderClasses.loaderWrapper} ${loaderClasses.loaderHeight80}`}>
            <Loader />
          </div>
        ) : !userInfo || userInfo.length === 0 || !userInfo.user.uniqueId ? (
          <div>No data</div>
        ) : (
          <>
            <UserHeader userInfo={userInfo} />
            <UserMain user={user} />
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
