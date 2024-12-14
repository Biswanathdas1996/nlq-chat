import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="chatbot-page">
        <div className="header-container">
          <div className="logoDiv">
            <img
              className="logoHP"
              src="data:image/png;base64,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"
              alt="PwC Logo"
            />
          </div>
          <div className="userDiv">
            <img
              className="user"
              src="data:image/png;base64,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"
              alt="User Icon"
            />
            <div>
              <div className="userName"></div>
              <div className="role"></div>
            </div>
          </div>
        </div>
        <div className="main-container">
          <div className="sidenav">
            <a className="nav-link active-link" href="/">
              <button className="sidenav-button">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAABClJREFUaAXtmrtuE0EUhmfHeYCIJ0C8Qd7AaZB3HSQ39EmfIl1K8gIkbqnsgj6uoUgqKGcNEgIBcoiQgKDIkYKQIiEt+mdzNvZ69jI3e5FYaTze2bmcb86ZM5ddxhxfos3WRYe1Rcj24ogP4jAQcRhM4ogncwFpYXASh8Ex8qKMY1HcVSehQtaTAkfBdA4kD1Z6H0wlcIdtu5POoiaAjTvsSWwFldMsdUCq9YHosPsWIpoV9QpGgDMxOnFpoOIh63nR2AyQ0sTDYCJ8mq7UWsiOlI1XCefw+TjkR5DFzPYKSsE8pDd0KKhVR6XadDM2b+EW3fyqYV1AuoZ7+/hecj0+Sa5ejRL8t9IiOtgG0gfc789xQhf+rwwSg1i5+jA0S4AQ3J9f0wQBl0NIoeV4xg69ZR7uw+5GguAaEt61wEfOJ2OusR4bt5pWwVHdPiAxR8/T5O5cjrsyOG+QcDplc2S6rixYG2qMvzpwviBFxA9yektvpfY0IEjAfKwDR2Udm+tUqUUR8iE1aBqbwFFbLiGVWrSdFmzgPEDOa9HWc7qAcw0551FFFIyoAd3YJRy17cRcw+AkczZxlxsdM/iAcwiZmikOe6hSndgnHMlhq0l5kCW6HKdfWiv7ZcCRTDaQIuR7THf8LRPOAeSApUd99TWIvRwuLJbRuySEjxidSfXOavL6zWmWTs8LYsFExM8KHioruRj1F+De7TxIvhzuKPPr1J3P++35QXL+dDurF5A3P86Sn6N+lpYvk7ufsFxC3YJZPsChUQhjW1e+POrENQuZz1N1bw14+XIohfAJePliYNx5/wGrTKBMg+93N+QhEw6aqoLKYZGJWmlQ18nkgcsAP+5vSvOt8/Npf3PBDB0AwskEIi+0zn0dQEwp54c7ykBnMz4ARdQ6Zbb7wDqAN98nC9qhToQHxuUFsBOMmMlSjYRD3GhAuVQzXGwTZKMBt9baTPTYuul2qeEanN7tB/GuXHNHQfmbqkGB8UeXeNTqkcC6cWMBo9bde34bM20o4ISUl8U4atPVHvITIGJM7LPh67M9OQXUmSaQd7Ys/md1669FBxkY/THVIq02ylYrdQDLyl8c194eyfkWh9jENRebaBGbUvQ0JuyiULZBxbOicki/eq33slR56EuUplo0MW1PZfAlhlp7GSS+WDKcMlZdTsx6TgJSxSLi/VULq9u+CHlfxaJMk6ZqucvQFdAyf/l7QRXl7eu05n0+sjh8qsedChBp/wCkORxBNxjSHq7BkKJyOiDh68ZwPE3wrvCWylfUdUGq8mGuiSO+fOfT5VMRtso/E6kSvu5zmIfJss5oKgBYxA+8aq0IXIKmHy+41+gqwVTAMF0RtUY2xx8oi6M+mOJKNKYCU6WJrbU2TusALAVWvMHCgbPo8lh0W0OZF2XKvlJSNVQj7S9Jw4CsiA5XgQAAAABJRU5ErkJggg=="
                  alt="Home"
                  className="nav-icon"
                />
                Home
              </button>
            </a>
            <a className="nav-link" href="/#/query">
              <button className="sidenav-button">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAABClJREFUaAXtmrtuE0EUhmfHeYCIJ0C8Qd7AaZB3HSQ39EmfIl1K8gIkbqnsgj6uoUgqKGcNEgIBcoiQgKDIkYKQIiEt+mdzNvZ69jI3e5FYaTze2bmcb86ZM5ddxhxfos3WRYe1Rcj24ogP4jAQcRhM4ogncwFpYXASh8Ex8qKMY1HcVSehQtaTAkfBdA4kD1Z6H0wlcIdtu5POoiaAjTvsSWwFldMsdUCq9YHosPsWIpoV9QpGgDMxOnFpoOIh63nR2AyQ0sTDYCJ8mq7UWsiOlI1XCefw+TjkR5DFzPYKSsE8pDd0KKhVR6XadDM2b+EW3fyqYV1AuoZ7+/hecj0+Sa5ejRL8t9IiOtgG0gfc789xQhf+rwwSg1i5+jA0S4AQ3J9f0wQBl0NIoeV4xg69ZR7uw+5GguAaEt61wEfOJ2OusR4bt5pWwVHdPiAxR8/T5O5cjrsyOG+QcDplc2S6rixYG2qMvzpwviBFxA9yektvpfY0IEjAfKwDR2Udm+tUqUUR8iE1aBqbwFFbLiGVWrSdFmzgPEDOa9HWc7qAcw0551FFFIyoAd3YJRy17cRcw+AkczZxlxsdM/iAcwiZmikOe6hSndgnHMlhq0l5kCW6HKdfWiv7ZcCRTDaQIuR7THf8LRPOAeSApUd99TWIvRwuLJbRuySEjxidSfXOavL6zWmWTs8LYsFExM8KHioruRj1F+De7TxIvhzuKPPr1J3P++35QXL+dDurF5A3P86Sn6N+lpYvk7ufsFxC3YJZPsChUQhjW1e+POrENQuZz1N1bw14+XIohfAJePliYNx5/wGrTKBMg+93N+QhEw6aqoLKYZGJWmlQ18nkgcsAP+5vSvOt8/Npf3PBDB0AwskEIi+0zn0dQEwp54c7ykBnMz4ARdQ6Zbb7wDqAN98nC9qhToQHxuUFsBOMmMlSjYRD3GhAuVQzXGwTZKMBt9baTPTYuul2qeEanN7tB/GuXHNHQfmbqkGB8UeXeNTqkcC6cWMBo9bde34bM20o4ISUl8U4atPVHvITIGJM7LPh67M9OQXUmSaQd7Ys/md1669FBxkY/THVIq02ylYrdQDLyl8c194eyfkWh9jENRebaBGbUvQ0JuyiULZBxbOicki/eq33slR56EuUplo0MW1PZfAlhlp7GSS+WDKcMlZdTsx6TgJSxSLi/VULq9u+CHlfxaJMk6ZqucvQFdAyf/l7QRXl7eu05n0+sjh8qsedChBp/wCkORxBNxjSHq7BkKJyOiDh68ZwPE3wrvCWylfUdUGq8mGuiSO+fOfT5VMRtso/E6kSvu5zmIfJss5oKgBYxA+8aq0IXIKmHy+41+gqwVTAMF0RtUY2xx8oi6M+mOJKNKYCU6WJrbU2TusALAVWvMHCgbPo8lh0W0OZF2XKvlJSNVQj7S9Jw4CsiA5XgQAAAABJRU5ErkJggg=="
                  alt="History"
                  className="nav-icon"
                />
                Saved Queries
                <div className="button-decoration"></div>
              </button>
            </a>
            <a aria-current="page" className="nav-link" href="/">
              <button className="sidenav-button">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAAA4VJREFUaAXtm42R4jAMhVMCJVACJaQESqAEOjg6WDqADo4OSAe5DnIdUMI7XtYihtjBseXgnTnNZJyYxNZnyfLfblUpC4AVgBrAHsAJQAugw1iYdwXw27xbK6uiV5yB2hqFb2OW4Bx+S+CdnnYJJRmwXwBSoHz0tDA9YJ2gYtynmcFcwGzEZUAB0BVzWMwFZufRovlc11jty67xQ/fUYRXne56v6B4mGn6IaVQtranjsgaOBZYm6ZDacLfbDXVdY7vdgvcKEg+ZA26z2aCqqv7i/ccgTUBRc0uCCNxqtQIvgipCcrYUHngAqEXLV7i2bcErA+SXJ0Y+Z3OsUegbfREuOCk7E+T2meblSbPfTcFlhGS38rvqvWJOiZIlBE4qyWDJw4vdvh+N9aTe6HQOnFSiDMnxZ2zFO+BZKoxNY+CkLmXIsRU9i1Kp/22aAieFK0I+WzE1cmrAZYAcIiqAi1QwN9WEk7qVLHl9BJvY9V0OOEXIbzc1G0RSbnCaE06UULBkXZkdLSkzKF0CThRJhNwTcFb/WxJOAfJEQO5NBgvXclwJcLLM1s0pbEwR25JcUwZKS8C/gS/3r+33+xFc13U4nbjDpyuHwwHn8zD/IOR6vQZ1CJSOgElCOFZKZbSFZdJbbMi5dSQD7na7XomcgKwjVv4Dvmu5KQuyzzAghFyugCUummrBWUHmFXgKsGma3n1lo2kqvV7HwVwBsA8ySbE+BJBDCqOs65K9mUyADfvgEIdfzRPwHALIKOsT/kbLZgK8EDB4UHEpWThgP1ULnhb8QMB+ss0j52FO5KKYyCvYgjd7PTgOYRNQ9k8FA15sQB5qRknBgMNhqTmLiHLTQgG7h/XkBkDUbFkAmXJgt6/j8dgPASHDBN+1v+W9XfZM9zoJ1yONtaLMNqZmKSGAU9/PWB5JO7hPf2OsyEUpW5oQvmtqgcrffN8xP+KwdLzpK2aMtaI0WwHp+xNf82ciBegapcIQOcVqrvRuyWNU8Z/96OhiceYZV01aZSzMOn0u6KLUPAzNDPu+37kAmfcDIOPhBLpgyHS4giEZH9yDuSg9NzWBp4ToSh3GR9RzgXzvm8NSusfSwsXAcKjpU1Aj3/TLqMl5RKsQjHXls5qvUQwoN61yWPRzYC5g47o8iotaVxrL8tvGTBeXt5gLzJVn/VsBgamwa3OZeX/uXkAP4M4eN7/Uof4B761s+UM7AxAAAAAASUVORK5CYII="
                  alt="Logout"
                  className="nav-icon"
                />
                Logout
              </button>
            </a>
            <a aria-current="page" className="nav-link" href="#/backlog">
              <button className="sidenav-button">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAAA4VJREFUaAXtm42R4jAMhVMCJVACJaQESqAEOjg6WDqADo4OSAe5DnIdUMI7XtYihtjBseXgnTnNZJyYxNZnyfLfblUpC4AVgBrAHsAJQAugw1iYdwXw27xbK6uiV5yB2hqFb2OW4Bx+S+CdnnYJJRmwXwBSoHz0tDA9YJ2gYtynmcFcwGzEZUAB0BVzWMwFZufRovlc11jty67xQ/fUYRXne56v6B4mGn6IaVQtranjsgaOBZYm6ZDacLfbDXVdY7vdgvcKEg+ZA26z2aCqqv7i/ccgTUBRc0uCCNxqtQIvgipCcrYUHngAqEXLV7i2bcErA+SXJ0Y+Z3OsUegbfREuOCk7E+T2meblSbPfTcFlhGS38rvqvWJOiZIlBE4qyWDJw4vdvh+N9aTe6HQOnFSiDMnxZ2zFO+BZKoxNY+CkLmXIsRU9i1Kp/22aAieFK0I+WzE1cmrAZYAcIiqAi1QwN9WEk7qVLHl9BJvY9V0OOEXIbzc1G0RSbnCaE06UULBkXZkdLSkzKF0CThRJhNwTcFb/WxJOAfJEQO5NBgvXclwJcLLM1s0pbEwR25JcUwZKS8C/gS/3r+33+xFc13U4nbjDpyuHwwHn8zD/IOR6vQZ1CJSOgElCOFZKZbSFZdJbbMi5dSQD7na7XomcgKwjVv4Dvmu5KQuyzzAghFyugCUummrBWUHmFXgKsGma3n1lo2kqvV7HwVwBsA8ySbE+BJBDCqOs65K9mUyADfvgEIdfzRPwHALIKOsT/kbLZgK8EDB4UHEpWThgP1ULnhb8QMB+ss0j52FO5KKYyCvYgjd7PTgOYRNQ9k8FA15sQB5qRknBgMNhqTmLiHLTQgG7h/XkBkDUbFkAmXJgt6/j8dgPASHDBN+1v+W9XfZM9zoJ1yONtaLMNqZmKSGAU9/PWB5JO7hPf2OsyEUpW5oQvmtqgcrffN8xP+KwdLzpK2aMtaI0WwHp+xNf82ciBegapcIQOcVqrvRuyWNU8Z/96OhiceYZV01aZSzMOn0u6KLUPAzNDPu+37kAmfcDIOPhBLpgyHS4giEZH9yDuSg9NzWBp4ToSh3GR9RzgXzvm8NSusfSwsXAcKjpU1Aj3/TLqMl5RKsQjHXls5qvUQwoN61yWPRzYC5g47o8iotaVxrL8tvGTBeXt5gLzJVn/VsBgamwa3OZeX/uXkAP4M4eN7/Uof4B761s+UM7AxAAAAAASUVORK5CYII="
                  alt="Logout"
                  className="nav-icon"
                />
                Backlog
              </button>
            </a>
          </div>
          <div className="content-container">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
