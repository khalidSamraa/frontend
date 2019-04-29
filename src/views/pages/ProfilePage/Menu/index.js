import React, { Component } from 'react';

import MenuItem from './Item';

class Menu extends Component {
  constructor() {
    super();

    this.state = {};

    this.toggleSubMenu = this.toggleSubMenu.bind(this);
    this.getItemsSorted = this.getItemsSorted.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activeTab !== '') {
      this.setState({
        drop: nextProps.activeTab === 9 || nextProps.activeTab === 10 || nextProps.activeTab === 11 || nextProps.activeTab === 4
      })
    }
  }

  componentDidMount () {
    this.setState({
      drop: this.props.pathname === '/profile/creditCards' ||
      this.props.pathname === '/profile/bankAccount' ||
      this.props.pathname === '/profile/moneyTransfers' ||
      this.props.pathname === '/profile/managePayment'
    })
  }

  toggleSubMenu() {
    this.setState({
      drop: !this.state.drop
    });
  }

  getItemsSorted() {
    const {
      words,
      institutionIsAuth,
      ensembleIsAuth,
      publisherIsAuth
    } = this.props;

    const arr = [
      {
        content: words['profile_menu_overview'],
        tab: 0,
        url: '/profile/overView'
      },
      {
        content: words['profile_menu_chg-name'],
        tab: 1,
        url: '/profile/changeName'
      },
      {
        content: words['profile_menu_chg-pwd'] || '',
        tab: 2,
        isUser: true,
        isUserAuth: !institutionIsAuth && !ensembleIsAuth && !publisherIsAuth,
        url: '/profile/changePassword'
      },
      {
        content: words['profile_menu_man-addr'],
        tab: 3,
        url: '/profile/addresses'
      },
      {
        content: words['profile_menu_man-paym'] || '',
        tab: 4,
        isDrop: true,
        url: '/profile/managePayment',
        list: [
          {
            content: 'Credit Cards',
            tab: 9,
            url: '/profile/creditCards',
          },
          {
            content: 'Bank Accounts',
            tab: 10,
            url: '/profile/bankAccount',
          },
          {
            content: 'Money Transfers',
            tab: 11,
            url: '/profile/moneyTransfers',
          }
        ]
      },
      {
        content: words['profile_menu_ord-hist'],
        tab: 5,
        url: '/profile/orderHistory',
      },
      {
        content: words['profile_menu_ccl-memb'],
        tab: 6,
        url: '/profile/cancelMemberShip',
      },
      {
        ensembleIsAuth,
        isEnsemble: true,
        content: words['profileensemble_delete_ensemble'],
        tab: 12,
        url: '/profile/deleteEnsemble',
      },
      {
        institutionIsAuth,
        isInstitution: true,
        content: words['profile_menu_man-pub'],
        tab: 13,
        url: '/profile/managePublishers',
      },
      {
        content: words['profile_menu_man-ctrct'],
        tab: 14,
        url: '/profile/contacts',
      }
    ];

    return arr.sort((a, b) => a.content.localeCompare(b.content));
  }

  render() {
    const {
      props: { toggleTab, activeTab, pathname },
      state: { drop },
      toggleSubMenu,
      getItemsSorted
    } = this;
    
    return (
      <ul className="menu-list">
        {getItemsSorted().map(item => {
          let onClick = item.isDrop
            ? tab => {
                toggleSubMenu();
                toggleTab(tab);
              }
            : toggleTab;

          let shouldHide =
            (item.isEnsemble && !item.ensembleIsAuth) ||
            (item.isUser && !item.isUserAuth) ||
            (item.isInstitution && !item.institutionIsAuth) ||
            (item.isPublisher && !item.publisherIsAuth);

          return shouldHide ? null : (
            <React.Fragment>
              <MenuItem
                key={item.tab}
                activeTab={activeTab}
                pathname={pathname}
                onClick={onClick}
                tab={item.tab}
                icon={item.icon}
                url={item.url}
              >
                {item.content}
              </MenuItem>
              {item.isDrop && (
                <ul>
                  {drop &&
                    item.list.map(el => (
                      <MenuItem
                        key={el.tab}
                        activeTab={activeTab}
                        pathname={pathname}
                        tab={el.tab}
                        onClick={toggleTab}
                        url={el.url}
                      >
                        {el.content}
                      </MenuItem>
                    ))}
                </ul>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    );
  }
}

export default Menu;
