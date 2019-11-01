export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer"
    },

    // {
    //   title: true,
    //   name: "Theme"
    // },
    // {
    //   name: "Colors",
    //   url: "/theme/colors",
    //   icon: "icon-drop"
    // },
    // {
    //   name: "Typography",
    //   url: "/theme/typography",
    //   icon: "icon-pencil"
    // },
    {
      title: true,
      name: "Administrator"
    },
    {
      name: "Administrator",
      url: "/Administrator",
      icon: "cui-user",
      children: [
        {
          name: "Users Overview",
          url: "/user_overview",
          icon: "cui-people"
          // start

          ///end
        },
        {
          name: "User Group",
          url: "/user_group",
          icon: "cui-people"
          // start

          ///end
        },
        {
          name: "User Role",
          url: "/userRole",
          icon: "cui-people"
          // start

          ///end
        },
        {
          name: "User Role Assignment",
          url: "/roleAssignment",
          icon: "cui-people"
          // start

          ///end
        },
        {
          name: "Program Manage",
          url: "/Program",
          icon: "cui-people"
          // start

          ///end
        },
        {
          name: "Menu Manage",
          url: "/Menu",
          icon: "cui-people"
          // start

          ///end
        },
        {
          name: "Role Permission Mapping",
          url: "/RolePermissionMap",
          icon: "cui-people"
          // start

          ///end
        },
        {
          name: "User Permission",
          url: "/UserPermission",
          icon: "cui-people"
          // start

          ///end
        },

        {
          name: "Search user",
          url: "/customers/search",
          icon: "icon-puzzle",
          ///start
          children: [
            {
              name: "sub menu 1",
              url: "/login",
              icon: "cui-people"
            },
            {
              name: "sub menu2",
              url: "/customers/search",
              icon: "icon-puzzle"
            },
            {
              name: "submenu 3",
              url: "/base/carousels",
              icon: "icon-puzzle"
            }
          ]

          ///end
        },
        {
          name: "Carousels",
          url: "/base/carousels",
          icon: "icon-puzzle"
        }
      ]
    },
    {
      name: "Application Management",
      url: "/mangement",
      icon: "fa fa-book",
      children: [
        {
          name: "Category",
          url: "/Category",
          icon: "icon-cursor"
        },
        {
          name: "Product",
          url: "/Product",
          icon: "icon-cursor"
        },

        {
          name: "Shelf Lives",
          url: "/ShelfLives",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Delivery",
          url: "/Delivery",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Items",
          url: "/Items",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "OverView Parameter",
          url: "/OverViewParameter",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Taxes",
          url: "/TaxData",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Country_data",
          url: "/Country_Data",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Currency",
          url: "/Currency",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Region",
          url: "/Region",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Customer type",
          url: "/Customer_type",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Customer Conatact Department",
          url: "/Customer_Conatact_department",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Invoice Type",
          url: "/invoice_Type",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Payment Method",
          url: "/Payment_method",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Payment Term",
          url: "/Payment_Term",
          icon: "icon-cursor"
          // start

          ///end
        }
      ]
    },
    {
      name: "Customer Management",
      url: "/Customermangement",
      icon: "fa fa-book",
      children: [
        {
          name: "Customer",
          url: "/CustomerData",
          icon: "icon-cursor"
          // start

          ///end
        },
        {
          name: "Address",
          url: "/Address",
          icon: "icon-cursor"
          // start

          ///end
        }
      ]
    },

    {
      divider: true
    },
    {
      title: true,
      name: "Extras"
    },
    {
      name: "Disabled",
      url: "/dashboard",
      icon: "icon-ban",
      attributes: { disabled: true }
    }
  ]
};
