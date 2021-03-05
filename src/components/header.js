import React from 'react';
import PropTypes from 'prop-types';
import { Link, withPrefix } from 'gatsby';
import { useLocation, navigate } from '@reach/router';

import useTranslation from '../hooks/useTranslation';
import { localizedLink } from '../utils/localizedLink';

const Header = ({ locale, isDefault }) => {
  const { pathname } = useLocation();
  const { title } = useTranslation();

  const changeLangHandler = (e, lang) => {
    e.preventDefault();

    // NOTE: This project is hosted on github-pages
    // and URL starts with "repo-name" prefix, so we
    // need to remove pathPrefix from the pathname
    // and change "navigate" path
    const prefix = withPrefix('/');
    const path = pathname.split(prefix).join('');

    if (locale === lang) {
      return;
    }

    // Pathname is a string like in ex.: "/ja/" or "/ja/page-2".
    // In case we want to switch to default language, then we'll omit first three
    // characters from the url ("/ja"), if not - add language to the path
    if (!isDefault) {
      navigate(`${prefix}${path.slice(3)}`) ;
    } else {
      navigate(`${prefix}${lang}/${path}`);
    }
  };

  return (
    <header className="head">
      <div className="wrapper">

        {/* Home link */}
        <h1 style={{ margin: 0 }}>
          <Link
            to={localizedLink('/', locale, isDefault)}
            className="link"
          >
            {title}
          </Link>
        </h1>

        {/* Language controls */}
        <div style={{ margin: 0 }}>
          <button
            className="btn"
            onClick={e => changeLangHandler(e, 'en')}
          >
            English
          </button>
          <button
            className="btn"
            onClick={e => changeLangHandler(e, 'ja')}
          >
            日本語
          </button>
        </div>

      </div>
    </header>
  );
};

Header.propTypes = {
  locale: PropTypes.string.isRequired,
  isDefault: PropTypes.bool.isRequired,
};

export default Header;
