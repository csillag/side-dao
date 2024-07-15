import { FC } from 'react'
import { useAppState } from '../../hooks/useAppState'

const logoSizeMap: Record<'large' | 'small', { width: number; height: number }> = {
  large: {
    width: 131,
    height: 49,
  },
  small: {
    width: 47,
    height: 18,
  },
}

interface Props {
  className?: string
  color: string
}

export const LogoIcon: FC<Props> = ({ className, color }) => {
  const {
    state: { isDesktopScreen },
  } = useAppState()
  const size = logoSizeMap[isDesktopScreen ? 'large' : 'small']

  return (
    <svg
      className={className}
      width={size.width}
      height={size.height}
      viewBox="0 0 131 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.1307 7.33387C39.1145 5.27832 36.7306 3.58725 34.0906 2.35917C33.9822 2.30335 33.8739 2.2541 33.7622 2.20484C33.2434 1.97171 32.718 1.7517 32.1828 1.55797C30.6789 1.01289 29.106 0.612294 27.4806 0.375873C26.3445 0.211692 25.1821 0.119751 24 0.119751C10.767 0.119751 0 10.8867 0 24.1197C0 34.4303 6.53441 43.2403 15.6826 46.6323C16.7596 47.0296 17.8695 47.3547 19.0122 47.5944C20.6244 47.9359 22.2925 48.1198 24.0033 48.1198C33.1186 48.1198 41.065 43.0104 45.1268 35.5041C46.9624 32.1154 48.0066 28.2341 48.0066 24.1165C48.0066 17.5853 45.383 11.6584 41.1372 7.3273L41.1307 7.33387ZM7.15502 36.962C4.31797 33.222 2.82063 28.7595 2.82063 24.0574C2.82063 16.0289 7.27323 9.01837 13.8372 5.37026C14.0112 5.27504 14.182 5.50489 14.0375 5.63952C13.4366 6.2043 12.862 6.80849 12.3136 7.45208C8.50787 11.9014 6.31769 17.9531 6.29799 24.0606C6.29799 31.9873 11.601 40.5444 20.168 40.5444C27.8123 40.5444 34.0348 33.1497 34.0348 24.0606C34.0348 19.7886 32.6031 15.6874 30.1568 12.6468C30.0714 12.5384 30.1732 12.3874 30.3046 12.4268C34.4386 13.6483 37.5285 18.403 37.5285 24.0639C37.5285 29.0616 35.716 34.0363 32.5538 37.714C29.2768 41.5262 24.8767 43.6278 20.168 43.6278C15.2097 43.6278 10.4616 41.1946 7.15502 36.9686V36.962ZM41.2226 11.1626C44.0564 14.8928 45.5504 19.3519 45.5471 24.0508C45.5471 32.0793 41.0945 39.0898 34.5306 42.7412C34.3565 42.8364 34.1858 42.6065 34.3303 42.4719C34.9312 41.9071 35.5058 41.3029 36.0542 40.6594C39.8599 36.21 42.0501 30.1583 42.0698 24.0508C42.0698 16.1241 36.7667 7.56701 28.1998 7.56701C20.5555 7.56701 14.333 14.9617 14.333 24.0508C14.333 28.3228 15.7647 32.424 18.211 35.4679C18.2964 35.5763 18.1946 35.7274 18.0632 35.688C13.9291 34.4664 10.8392 29.715 10.8392 24.0574C10.8392 19.0597 12.6518 14.085 15.8139 10.4106C19.091 6.59834 23.491 4.49682 28.203 4.49682C33.158 4.49682 37.9029 6.92669 41.2226 11.1626ZM31.5261 24.0574C31.5261 29.7183 28.7744 34.6044 24.834 36.7978C24.3448 37.0704 23.7439 37.0342 23.2907 36.7059L22.4468 36.0918C18.9892 33.57 16.8417 28.9565 16.8417 24.0508C16.8417 18.3898 19.5934 13.5038 23.5337 11.3103C24.023 11.0378 24.6239 11.0739 25.077 11.4023L25.9209 12.0163C29.3786 14.5381 31.5261 19.1516 31.5261 24.0541V24.0574Z"
        fill={color}
      />
      <path
        d="M67.9119 16.8533C66.8415 16.1671 65.5871 15.8256 64.1555 15.8256C62.7238 15.8256 61.4662 16.1671 60.3859 16.8533C59.3056 17.5396 58.4715 18.5182 57.8805 19.7955C57.2894 21.0728 56.9939 22.5931 56.9939 24.3564C56.9939 26.1197 57.2894 27.6171 57.8805 28.8944C58.4715 30.1717 59.3056 31.1535 60.3859 31.8464C61.4662 32.5392 62.7205 32.8873 64.1555 32.8873C65.5904 32.8873 66.8415 32.5425 67.9119 31.8464C68.9824 31.1535 69.8164 30.1685 70.4173 28.8944C71.015 27.6171 71.3138 26.1066 71.3138 24.3564C71.3138 22.6063 71.015 21.0531 70.4173 19.7856C69.8197 18.5182 68.9824 17.5396 67.9119 16.8566V16.8533ZM67.2881 27.4266C66.9827 28.2771 66.5558 28.9272 66.0107 29.3771C65.4689 29.8269 64.8483 30.0502 64.1555 30.0502C63.4626 30.0502 62.8387 29.8269 62.2904 29.3771C61.7387 28.9272 61.3086 28.2771 61.0032 27.4266C60.6945 26.5762 60.5435 25.5517 60.5435 24.3564C60.5435 23.1612 60.6978 22.1367 61.0032 21.2862C61.3086 20.4358 61.7387 19.7856 62.2904 19.3358C62.842 18.8859 63.4626 18.6626 64.1555 18.6626C64.8483 18.6626 65.4657 18.8859 66.0107 19.3358C66.5558 19.7856 66.9794 20.4292 67.2881 21.2731C67.5967 22.117 67.7478 23.1448 67.7478 24.3564C67.7478 25.5681 67.5934 26.5762 67.2881 27.4266Z"
        fill={color}
      />
      <path
        d="M77.441 16.6762L73.3923 31.6331C73.261 32.1224 73.6287 32.6018 74.1311 32.6018H75.9404C76.2885 32.6018 76.5938 32.3653 76.6825 32.0304L77.3031 29.6761C77.3918 29.3379 77.6971 29.1047 78.0452 29.1047H82.1727C82.5241 29.1047 82.8294 29.3411 82.9148 29.6793L83.5223 32.0271C83.6109 32.3653 83.9163 32.6018 84.2644 32.6018H86.1623C86.668 32.6018 87.0358 32.1224 86.9011 31.6331L82.8294 16.6762C82.7375 16.3413 82.4354 16.1114 82.0906 16.1114H78.1831C77.8383 16.1114 77.5329 16.3446 77.4443 16.6795L77.441 16.6762ZM79.1912 26.2677C78.6888 26.2677 78.321 25.7915 78.4491 25.3056L79.1288 22.7246L79.3751 21.6968C79.5622 20.9121 80.6787 20.9121 80.8658 21.6968L81.1121 22.7246L81.7787 25.3088C81.9035 25.7948 81.539 26.2677 81.0366 26.2677H79.1879H79.1912Z"
        fill={color}
      />
      <path
        d="M105.404 16.8766V18.1769C105.404 18.6005 105.749 18.9453 106.173 18.9453H107.404C107.828 18.9453 108.172 19.29 108.172 19.7136V28.9997C108.172 29.4233 107.828 29.7681 107.404 29.7681H106.173C105.749 29.7681 105.404 30.1129 105.404 30.5365V31.8368C105.404 32.2603 105.749 32.6051 106.173 32.6051H113.594C114.017 32.6051 114.362 32.2603 114.362 31.8368V30.5365C114.362 30.1129 114.017 29.7681 113.594 29.7681H112.362C111.939 29.7681 111.594 29.4233 111.594 28.9997V19.7136C111.594 19.29 111.939 18.9453 112.362 18.9453H113.594C114.017 18.9453 114.362 18.6005 114.362 18.1769V16.8766C114.362 16.453 114.017 16.1082 113.594 16.1082H106.173C105.749 16.1082 105.404 16.453 105.404 16.8766Z"
        fill={color}
      />
      <path
        d="M129.89 25.6438C129.569 25.0364 129.142 24.5504 128.613 24.1793C128.084 23.8083 127.51 23.5193 126.889 23.3059C126.265 23.0925 125.641 22.9118 125.011 22.7641C124.38 22.6163 123.803 22.4554 123.274 22.2912C122.745 22.1271 122.325 21.9103 122.01 21.6411C121.694 21.3751 121.537 21.0205 121.537 20.5772C121.537 19.9632 121.77 19.4903 122.233 19.1587C122.696 18.827 123.284 18.6628 123.993 18.6628C124.482 18.6628 124.942 18.7449 125.352 18.9584C125.894 19.244 126.265 19.6808 126.472 19.9927C126.613 20.2061 126.853 20.3309 127.109 20.3309H129.178C129.713 20.3309 130.097 19.7924 129.897 19.2933C129.756 18.9387 129.578 18.6103 129.358 18.3082C128.777 17.5037 128.015 16.8897 127.08 16.4661C126.144 16.0392 125.116 15.8291 123.996 15.8291C122.785 15.8291 121.727 16.0425 120.831 16.4661C119.934 16.8897 119.235 17.4709 118.739 18.2031C118.243 18.9354 117.994 19.7596 117.994 20.6724C117.994 21.5853 118.151 22.2814 118.467 22.856C118.782 23.4307 119.202 23.8937 119.731 24.2384C120.259 24.5865 120.837 24.8689 121.468 25.0889C122.098 25.3089 122.725 25.4993 123.346 25.657C123.97 25.8146 124.545 25.9853 125.07 26.1659C125.599 26.3465 126.019 26.5797 126.334 26.8621C126.649 27.1444 126.807 27.5221 126.807 27.9949C126.807 28.6418 126.567 29.1442 126.088 29.5087C125.609 29.8699 124.965 30.0504 124.164 30.0504C123.172 30.0504 122.417 29.7582 121.895 29.177C121.678 28.934 121.511 28.6418 121.389 28.3036C121.268 27.9654 120.962 27.7486 120.608 27.7486H118.746C118.233 27.7486 117.869 28.2379 118.007 28.7304C118.132 29.177 118.299 29.5973 118.513 29.9815C119.031 30.9108 119.774 31.6266 120.732 32.1323C121.694 32.6347 122.837 32.8875 124.157 32.8875C125.356 32.8875 126.423 32.6774 127.359 32.2603C128.295 31.8433 129.033 31.2687 129.569 30.5364C130.104 29.8042 130.373 28.9504 130.373 27.9719C130.373 26.9934 130.212 26.2513 129.887 25.6438H129.89Z"
        fill={color}
      />
      <path
        d="M101.625 25.6438C101.303 25.0364 100.876 24.5504 100.348 24.1793C99.819 23.8083 99.2443 23.5193 98.6237 23.3059C97.9999 23.0925 97.376 22.9118 96.7455 22.7641C96.1151 22.6163 95.5371 22.4554 95.0085 22.2912C94.4798 22.1271 94.0595 21.9103 93.7443 21.6411C93.4291 21.3751 93.2714 21.0205 93.2714 20.5772C93.2714 19.9632 93.5046 19.4903 93.9676 19.1587C94.4306 18.827 95.0183 18.6628 95.7276 18.6628C96.2169 18.6628 96.6766 18.7449 97.087 18.9584C97.6288 19.244 97.9999 19.6808 98.2067 19.9927C98.3479 20.2061 98.5876 20.3309 98.8437 20.3309H100.912C101.448 20.3309 101.832 19.7924 101.632 19.2933C101.49 18.9387 101.313 18.6103 101.093 18.3082C100.512 17.5037 99.75 16.8897 98.8142 16.4661C97.8784 16.0392 96.8506 15.8291 95.7309 15.8291C94.5192 15.8291 93.4619 16.0425 92.5655 16.4661C91.669 16.8897 90.9696 17.4709 90.4738 18.2031C89.978 18.9354 89.7284 19.7596 89.7284 20.6724C89.7284 21.5853 89.886 22.2814 90.2012 22.856C90.5165 23.4307 90.9368 23.8937 91.4654 24.2384C91.9941 24.5865 92.572 24.8689 93.2025 25.0889C93.8329 25.3089 94.4601 25.4993 95.0807 25.657C95.7046 25.8146 96.2792 25.9853 96.8046 26.1659C97.3333 26.3465 97.7536 26.5797 98.0688 26.8621C98.384 27.1444 98.5416 27.5221 98.5416 27.9949C98.5416 28.6418 98.3019 29.1442 97.8225 29.5087C97.3431 29.8731 96.6995 30.0504 95.8983 30.0504C94.9067 30.0504 94.1514 29.7582 93.6294 29.177C93.4126 28.934 93.2452 28.6418 93.1237 28.3036C93.0022 27.9719 92.6968 27.7486 92.3422 27.7486H90.4804C89.9681 27.7486 89.6036 28.2379 89.7415 28.7304C89.8663 29.177 90.0338 29.5973 90.2472 29.9815C90.766 30.9108 91.5081 31.6266 92.4669 32.1323C93.429 32.6347 94.5718 32.8875 95.8918 32.8875C97.0903 32.8875 98.1575 32.6774 99.0933 32.2603C100.029 31.8433 100.768 31.2687 101.303 30.5364C101.838 29.8042 102.108 28.9504 102.108 27.9719C102.108 26.9934 101.947 26.2513 101.622 25.6438H101.625Z"
        fill={color}
      />
    </svg>
  )
}
