import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import SEO from '../components/seo';
import useTranslation from '../hooks/useTranslation';
import { localizedLink } from '../utils/localizedLink';

const IndexPage = ({ pageContext }) => {
  const { locale, isDefault }  = pageContext;
  const { greeting, mainPageContent, secondPageLink, indexPageTitle } = useTranslation();

  return (
    <>
      <SEO title={indexPageTitle} />

      <h1>{greeting}</h1>
      <p>{mainPageContent}</p>

      <div>
        <StaticImage
          src="../images/gatsby-astronaut.png"
          width={300}
          quality={95}
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="A Gatsby astronaut"
          style={{ marginBottom: `1.45rem` }}
        />
      </div>
      <Link to={localizedLink('/page-2/', locale, isDefault )}>{secondPageLink}</Link> <br />
    </>
  );
};

IndexPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired,
  }),
};

export default IndexPage;
