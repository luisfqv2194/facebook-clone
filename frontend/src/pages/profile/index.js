import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/header'
import './style.css'
import Cover from './Cover'
import ProfilePictureInfos from './ProfilePictureInfos'
import ProfileMenu from './ProfileMenu'
import PplYouMayKnow from './PplYouMayKnow'
import CreatePost from '../../components/createPost'
import GridPosts from './GridPosts'
import Post from '../../components/post'
import Photos from './Photos'
import Friends from './Friends'
import Intro from '../../components/intro'
import { useMediaQuery } from 'react-responsive'
import CreatePostPopup from '../../components/createPostPopup'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { HashLoader } from 'react-spinners'

export default function Profile({ getAllPosts }) {
  const [visible, setVisible] = useState(false)
  const { username } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => ({ ...state }))
  const [photos, setPhotos] = useState({})
  const profileTop = useRef(null)
  const leftSide = useRef(null)
  const [height, setHeight] = useState()
  const [leftHeight, setLeftHeight] = useState()
  const [scrollHeight, setScrollHeight] = useState()
  const [othername, setOthername] = useState()
  var userName = username === undefined ? user.username : username
  let visitor = userName === user.username ? false : true
  const { profile } = useSelector((state) => ({
    ...state,
  }))

  const path = `${userName}/*`
  const max = 30
  const sort = 'desc'

  const getProfile = async () => {
    try {
      dispatch({
        type: 'profile/profile_request',
      })
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      if (data.ok === false) {
        navigate('/profile')
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          )
          setPhotos(images.data)
        } catch (error) {
          console.log(error)
        }
        dispatch({
          type: 'profile/profile_success',
          payload: data,
        })
      }
    } catch (error) {
      dispatch({
        type: 'profile/profile_error',
        payload: error.response.data.message,
      })
    }
  }

  useEffect(() => {
    getProfile()
  }, [userName])
  useEffect(() => {
    setOthername(profile.profile?.details?.otherName)
  }, [profile])
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300)
    setLeftHeight(leftSide.current.clientHeight)
    window.addEventListener('scroll', getScroll, { passive: true })
    return () => {
      window.addEventListener('scroll', getScroll, { passive: true })
    }
  }, [profile.loading, scrollHeight])
  const check = useMediaQuery({
    query: '(min-width:901px)',
  })
  const getScroll = () => {
    setScrollHeight(window.pageYOffset)
  }

  return (
    <div className='profile'>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={profile.profile?.posts}
          dispatch={dispatch}
          profile={profile.profile}
        />
      )}
      <Header page='profile' getAllPosts={getAllPosts} />
      <div className='profile_top' ref={profileTop}>
        <div className='profile_container'>
          {profile.loading ? (
            <>
              <div className='profile_cover'>
                <Skeleton
                  height='347px'
                  key={'skeleton_profile_cover'}
                  containerClassName='avatar-skeleton'
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <div
                className='profile_img_wrap'
                style={{
                  marginBottom: '-3rem',
                  transform: 'translateY(-8px)',
                }}
              >
                <div className='profile_w_left'>
                  <Skeleton
                    key={'skeleton_profile_w_left'}
                    circle
                    height='180px'
                    width='180px'
                    containerClassName='avatar-skeleton'
                    style={{ transform: 'translateY(-3.3rem)' }}
                  />
                  <div className='profile_w_col'>
                    <div className='profile_name'>
                      <Skeleton
                        key={'skeleton_profile_name1'}
                        height='35px'
                        width='200px'
                        containerClassName='avatar-skeleton'
                      />
                      <Skeleton
                        key={'skeleton_profile_name2'}
                        height='30px'
                        width='100px'
                        containerClassName='avatar-skeleton'
                        style={{ transform: 'translateY(2.5px)' }}
                      />
                    </div>
                    <div className='profile_friend_count'>
                      <Skeleton
                        key={'skeleton_profile_friend_count'}
                        height='20px'
                        width='90px'
                        containerClassName='avatar-skeleton'
                        style={{ marginTop: '5px' }}
                      />
                    </div>
                    <div className='profile_friend_imgs'>
                      {Array.from(new Array(6), (val, i) => i + 1).map(
                        (id, i) => (
                          <Skeleton
                            key={'skeleton_profile_friend_imgs_' + i}
                            circle
                            height='32px'
                            width='32px'
                            containerClassName='avatar-skeleton'
                            style={{ transform: `translateX(${-i * 7}px)` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className={`friendship ${!visitor && 'fix'}`}>
                  <Skeleton
                    key={'skeleton_friendship'}
                    height='36px'
                    width={120}
                    containerClassName='avatar-skeleton'
                  />
                  <div className='flex'>
                    <Skeleton
                      key={'skeleton_friendship_flex1'}
                      height='36px'
                      width={120}
                      containerClassName='avatar-skeleton'
                    />
                    {visitor && (
                      <Skeleton
                        key={'skeleton_friendship_flex2'}
                        height='36px'
                        width={120}
                        containerClassName='avatar-skeleton'
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Cover
                cover={profile.profile.cover}
                visitor={visitor}
                photos={photos.resources}
              />
              <ProfilePictureInfos
                profile={profile.profile}
                visitor={visitor}
                photos={photos.resources}
                othername={othername}
              />
            </>
          )}

          <ProfileMenu />
        </div>
      </div>
      <div className='profile_bottom'>
        <div className='profile_container'>
          <div className='bottom_container'>
            <PplYouMayKnow />
            <div
              className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? 'scrollFixed showLess'
                  : check &&
                    scrollHeight >= height &&
                    leftHeight < 1000 &&
                    'scrollFixed showMore'
              }`}
            >
              <div className='profile_left' ref={leftSide}>
                {profile.loading ? (
                  <>
                    <div className='profile_card'>
                      <div className='profile_card_header'>Intro</div>
                      <div className='skeleton_loader'>
                        <HashLoader color='#1876f2' />
                      </div>
                    </div>
                    <div className='profile_card'>
                      <div className='profile_card_header'>
                        Photos
                        <div className='profile_header_link'>
                          See all photos
                        </div>
                      </div>
                      <div className='skeleton_loader'>
                        <HashLoader color='#1876f2' />
                      </div>
                    </div>
                    <div className='profile_card'>
                      <div className='profile_card_header'>
                        Friends
                        <div className='profile_header_link'>
                          See all friends
                        </div>
                      </div>
                      <div className='skeleton_loader'>
                        <HashLoader color='#1876f2' />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Intro
                      detailss={profile.profile.details}
                      visitor={visitor}
                      setOthername={setOthername}
                    />
                    <Photos
                      username={userName}
                      token={user.token}
                      photos={photos}
                    />
                    <Friends friends={profile.profile.friends} />{' '}
                  </>
                )}

                <div className='relative_fb_copyright'>
                  <Link to='/'>Privacy </Link>
                  <span>. </span>
                  <Link to='/'>Terms </Link>
                  <span>. </span>
                  <Link to='/'>Advertising </Link>
                  <span>. </span>
                  <Link to='/'>
                    Ad Choices <i className='ad_choices_icon'></i>{' '}
                  </Link>
                  <span>. </span>
                  <Link to='/'></Link>Cookies <span>. </span>
                  <Link to='/'>More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className='profile_right'>
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                <GridPosts />
                {profile.loading ? (
                  <div className='skeleton_loader'>
                    <HashLoader color='#1876f2' />
                  </div>
                ) : (
                  <div className='posts'>
                    {profile.profile.posts && profile.profile.posts.length ? (
                      profile.profile.posts.map((post) => (
                        <Post post={post} user={user} key={post._id} profile />
                      ))
                    ) : (
                      <div className='no_posts'>No posts available</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
