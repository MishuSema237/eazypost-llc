import React, { useEffect } from 'react';

// TypeScript declarations for Smartsupp API
declare global {
  interface Window {
    _smartsupp?: any;
    smartsupp?: any;
  }
}

const LiveChat: React.FC = () => {
  useEffect(() => {
    // Configure Smartsupp
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = '78ef9ef7fb476eabd54f433a395f296a4628cbc0';

    // Load Smartsupp script
    if (!window.smartsupp) {
      (function (d) {
        var s, c, o = (window.smartsupp = function () {
          o._.push(arguments);
        }) as any;
        o._ = [];
        s = d.getElementsByTagName('script')[0];
        c = d.createElement('script');
        c.type = 'text/javascript';
        c.charset = 'utf-8';
        c.async = true;
        c.src = 'https://www.smartsuppchat.com/loader.js?';
        if (s && s.parentNode) {
          s.parentNode.insertBefore(c, s);
        } else {
          d.head.appendChild(c);
        }
      })(document);
    }

    // Cleanup function
    return () => {
      // We generally don't remove the script as it might be shared, 
      // but if we navigated away we might want to hide it.
      // Smartsupp doesn't have a simple 'remove' but we can leave it be 
      // as this is a global tracking script usually.
    };
  }, []);

  return null;
};

export default LiveChat;
