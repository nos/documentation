/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.docUrl('intro.html', this.props.language)} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('nos-client/getting-started.html','')}>
              nOS Client documentation
            </a>
            <a href={this.docUrl('create-nos-dapp/installation-usage.html', '')}>
              Create nOS dApp documentation
            </a>
            <a href={this.docUrl('nos-local/installation-usage.html', '')}>
              nOS Local documentation
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="https://discordapp.com/invite/eGFAskm">Discord Chat</a>



            <a
              href="https://t.me/nOSplatform"
              target="_blank"
              rel="noreferrer noopener">
              Telegram
            </a>

            <a
              href="https://t.me/nOSAnnouncements"
              target="_blank"
              rel="noreferrer noopener">
              Telegram Announcements
            </a>

            <a
              href="https://twitter.com/nOSplatform"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>

            <a
              href="https://www.reddit.com/r/nOSplatform"
              target="_blank"
              rel="noreferrer noopener">
              Reddit
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={this.props.config.baseUrl + 'blog'}>Blog</a>
            <a href="https://github.com/nos">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count={true}
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
