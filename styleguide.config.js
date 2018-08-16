const path = require("path");
const fs = require("fs");
// const snapguidist = require("snapguidist");

const componentsDir = path.join(__dirname, "package/src/components");
const componentTree = {};
// const { defaultHandlers } = require("react-docgen");

// function customDisplayName(componentPath) {
//   return (documentation, definition) => {
//     documentation.set("displayName", "v1");
//     documentation.set("path", "Button/v1/Button");

//     console.log(documentation, definition.value.id.name);
//     // Calculate a display name for components based upon the declared class name.
//     // if (
//     //   definition.value.type === "ClassDeclaration" &&
//     //   definition.value.id.type === "Identifier"
//     // ) {
//     //   documentation.set("displayName", "v1");

//     //   // Calculate the key required to find the component in the module exports
//     //   if ( //     //     definition.parentPath.value.type === "ExportNamedDeclaration"
//     //   ) {
//     //     console.log("name", definition.value.id.name);
//     //     documentation.set("path", `v1.${definition.value.id.name}`);
//     //   }
//     // }

//     // // The component is the default export
//     // if (
//     //   definition.parentPath.value.type === "ExportDefaultDeclaration"
//     // ) {
//     //   console.log("isDefault");
//     //   documentation.set("path", "default");
//     // }
//   };
// }

// Build componentTree from project files
if (fs.statSync(componentsDir).isDirectory()) {
  const componentItems = fs.readdirSync(componentsDir);
  componentItems.forEach((componentName) => {
    const fullItemPath = path.join(componentsDir, componentName);
    if (fs.statSync(fullItemPath).isDirectory()) {
      const versionItems = fs.readdirSync(fullItemPath);
      versionItems.forEach((versionName) => {
        componentTree[componentName] = componentTree[componentName] || {};
        componentTree[componentName][versionName] = path.join("./package/src/components", componentName, versionName, `${componentName}.js`);
      });
    }
  });
}

// function generateSection({ componentNames, name, content }) {
//   const sections = componentNames.map((componentName) => {
//     const components = Object.keys(componentTree[componentName]).map((version) => componentTree[componentName][version]);
//     return { name: componentName, components: () => components };
//   });

//   return { content, name, sections };
// }

/**
 * @name generateSection
 * @summary generates an object that builds a section in the styleguide
 * @param {Object} options - Function parameters
 * @param {[String]} componentNames - Array of strings of component names
 * @param {String} name - Name of section
 * @param {String} content - path to markdown content file
 * @returns {Object} with content, name, components keys
 */
function generateSection({ componentNames, name, content }) {
  const components = componentNames.map((componentName) =>
    Object.keys(componentTree[componentName]).map((version) => componentTree[componentName][version])[0]);

  return { content, name, components };
}

module.exports = {
  title: "Reaction Design System",
  editorConfig: { theme: "base16-light" },
  theme: {
    sidebarWidth: 320,
    maxWidth: 1000,
    color: {
      link: "#062a4e",
      linkHover: "#fd8283"
    },
    fontFamily: {
      base: [
        "'PostGrotesk-Regular'",
        "-apple-system",
        "sans-serif"
      ],
      monospace: ["Overpass Mono", "Menlo", "monospace"]
    },
    fontSize: {
      base: 16,
      text: 16,
      small: 14,
      h1: 40,
      h2: 40,
      h3: 40,
      h4: 25,
      h5: 20,
      h6: 18
    }
  },
  styles: {
    Text: {
      strong: {
        fontFamily: ["'PostGrotesk-Bold'", "-apple-system", "sans-serif"]
      }
    },
    Para: {
      para: {
        width: "60%"
      }
    },
    List: {
      list: {
        width: "60%"
      },
      ordered: {
        width: "60%"
      },
      unordered: {
        width: "60%"
      }
    },
    StyleGuide: {
      content: {
        maxWidth: "initial",
        padding: "0 80px"
      },
      sidebar: {
        backgroundColor: "#f7fdff",
        border: [["#a7edff", "solid"]],
        borderWidth: [[0, 2, 0, 0]],
        paddingLeft: 25
      },
      logo: {
        borderBottom: [[0]],
        backgroundImage: "url(reaction-design-system-logo.svg)",
        backgroundRepeat: "no-repeat",
        height: 110,
        backgroundPosition: "25% 50%",
        backgroundSize: 235
      }
    },
    EditorLoader: {
      "@global": {
        ".CodeMirror.CodeMirror": {
          borderRadius: 3,
          marginTop: 20,
          marginBottom: 20
        }
      }
    },
    Playground: {
      controls: {
        marginTop: "40px"
      }
    },
    ComponentsList: {
      item: {
        "color": "#062a4e",
        "fontSize": 14,
        "& > a": {
          display: "inline",
          fontFamily: "PostGrotesk-Bold !important",
          letterSpacing: "0.6px !important",
          textDecoration: "none !important"
        }
      },
      isChild: {
        "& > a": {
          fontFamily: "PostGrotesk-Regular !important",
          letterSpacing: "0.4px !important"
        },
        "& > a:hover": {
          cursor: "pointer",
          backgroundImage: "linear-gradient(#f7fdff 50%, #a7edff 50%) !important",
          backgroundRepeat: "repeat-x !important",
          backgroundSize: "8px 4px !important",
          backgroundPositionY: "0.9em !important",
          transition: "background-image .3s ease-in"
        }
      }
    },
    Heading: {
      heading1: {
        fontFamily: "PostGrotesk-Medium",
        marginTop: "20px"
      },
      heading2: {
        fontFamily: "PostGrotesk-Medium"
      },
      heading3: {
        fontFamily: "PostGrotesk-Medium",
        color: "#052a4e",
        marginBottom: "30px",
        marginTop: "40px"
      },
      heading4: {
        fontFamily: "PostGrotesk-Regular",
        color: "#052a4e",
        marginBottom: "30px",
        marginTop: "40px"
      },
      heading5: {
        fontFamily: "PostGrotesk-Bold",
        color: "#4d4d4d"
      }
    },
    ReactComponent: {
      header: {
        backgroundColor: "#fffbcc",
        margin: "0 -80px 40px -80px",
        padding: "20px 80px 40px 80px"
      }
    },
    SectionHeading: {
      sectionName: {
        "color": "#052a4e",
        "cursor": "text",
        "pointerEvents": "none",
        "fontFamily": ["Overpass Mono", "Menlo", "monospace"],
        "fontSize": "50px",
        "&:hover, &:active": {
          cursor: "text",
          pointerEvents: "none",
          textDecoration: "none"
        }
      }
    },
    Link: {
      link: {
        "&, &:link, &:visited": {
          color: "inherit",
          textDecoration: "underline"
        },
        "&:hover, &:active": {
          color: "inherit",
          textDecoration: "none"
        }
      }
    },
    Logo: {
      logo: {
        display: "none"
      }
    },
    Table: {
      table: {
        marginBottom: "30px"
      },
      tableHead: {
        borderBottom: [[2, "#a7edff", "solid"]],
        fontFamily: "PostGrotesk-Medium"
      },
      cell: {
        paddingTop: "8px",
        paddingBottom: "8px",
        borderBottom: [[1, "#e7e7e7", "solid"]]
      }
    },
    TableCell: {
      td: {
        paddingTop: "8px",
        paddingBottom: "8px",
        borderBottom: [[1, "#e7e7e7", "solid"]]
      }
    },
    TableHead: {
      thead: {
        borderBottom: [[2, "#a7edff", "solid"]],
        fontFamily: "PostGrotesk-Medium"
      }
    },
    TableOfContents: {
      search: {
        "paddingLeft": 0,
        "position": "relative",
        "&::before": {
          border: "3px solid #052a4e",
          borderRadius: "50%",
          content: "' '",
          display: "block",
          height: 12,
          left: 14,
          width: 12,
          position: "absolute",
          top: "49%",
          zIndex: 1,
          transform: "translateY(-58%)"
        },
        "&::after": {
          background: "#052a4e",
          content: "' '",
          display: "block",
          height: 7,
          left: 24,
          position: "absolute",
          transform: "rotate(-45deg)",
          top: "52%",
          width: 3,
          zIndex: 1
        }
      },
      input: {
        "backgroundColor": "#f6f6f6",
        "border": "1px solid #f6f6f6",
        "borderRadius": 23,
        "padding": 11,
        "paddingLeft": 35,
        "&:focus": {
          borderColor: "#ebebeb"
        }
      }
    },
    Code: {
      code: {
        whiteSpace: "pre-wrap"
      }
    }
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, "styleguide/src/components/Wrapper")
  },
  sections: [
    {
      name: "Introduction",
      content: "styleguide/src/sections/Introduction.md",
      sections: [
        {
          name: "Using Components",
          content: "styleguide/src/sections/InstallingandImporting.md"
        }
      ]
    },
    {
      name: "Style",
      sections: [
        {
          name: "Colors",
          content: "styleguide/src/sections/Colors.md"
        }
      ]
    },
    {
      name: "Base Components",
      sections: [
        generateSection({
          componentNames: ["Button", "Link"],
          content: "styleguide/src/sections/Actions.md",
          name: "Actions"
        }),
        generateSection({
          componentNames: ["ProgressiveImage"],
          content: "styleguide/src/sections/Content.md",
          name: "Content"
        }),
        generateSection({
          componentNames: ["Checkbox", "ErrorsBlock", "Field", "PhoneNumberInput", "QuantityInput", "Select", "TextInput"],
          content: "styleguide/src/sections/Forms.md",
          name: "Forms"
        })
      ]
    },
    {
      name: "Storefront Components",
      sections: [
        generateSection({
          componentNames: ["ShopLogo"],
          content: "styleguide/src/sections/General.md",
          name: "General"
        }),
        generateSection({
          componentNames: ["Price", "StockWarning", "BadgeOverlay", "CatalogItem", "CatalogGrid"],
          content: "styleguide/src/sections/Product.md",
          name: "Product"
        }),
        generateSection({
          componentNames: ["CartEmptyMessage", "CartItem", "CartItems", "CartItemDetail", "CartSummary", "MiniCart", "MiniCartSummary"],
          content: "styleguide/src/sections/Cart.md",
          name: "Cart"
        }),
        generateSection({
          componentNames: ["CheckoutAction", "CheckoutActionComplete", "CheckoutActionIncomplete", "CheckoutEmailAddress", "CheckoutTopHat", "SelectableItem"],
          content: "styleguide/src/sections/Checkout.md",
          name: "Checkout"
        }),
        generateSection({
          componentNames: ["AddressForm", "StripeForm"],
          content: "styleguide/src/sections/StorefrontForms.md",
          name: "Forms"
        })
      ]
    }
  ],
  require: ["babel-polyfill", path.join(__dirname, "styleguide/src/styles.css")],
  webpackConfig: {
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            path.resolve(__dirname, "package/src"),
            path.resolve(__dirname, "styleguide/src")
          ],
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }
      ]
    }
  },
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, ".js");
    const dir = path.dirname(componentPath);
    const version = dir.slice(dir.lastIndexOf("/") + 1);
    return `import ${name} from "@reactioncommerce/components/${name}/${version}"`;
  },
  pagePerSection: true,
  showCode: true,
  showUsage: true,
  serverPort: Number(process.env.PORT),
  assetsDir: "styleguide/src/assets/",
  styleguideDir: "styleguide/dist",
  template: "styleguide/src/index.html"
  // handlers(componentPath) {
  //   return defaultHandlers.concat(
  //     // require("react-docgen-displayname-handler").createDisplayNameHandler(componentPath),
  //     customDisplayName(componentPath));
  // }
};
