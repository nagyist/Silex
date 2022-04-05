import * as blocksBasicPlugin from 'grapesjs-blocks-basic/dist/grapesjs-blocks-basic.min.js'
import * as headerPlugin from 'grapesjs-plugin-header/dist/grapesjs-plugin-header.min.js'
import { projectBarPlugin } from './grapesjs/project-bar'
import { pagePanelPlugin, cmdTogglePages } from './grapesjs/page-panel'
import { pageSettings, cmdOpenPageSettings } from './grapesjs/page-settings'

/**
 * @fileoverview Silex config overridable from index.pug
 */

const catBasic = 'Containers'
const catText = 'Texts'
const projectEndpoint = '/projectEndpoint'
const projectId = 'projectId'

// reference to avoid removal by typescript
blocksBasicPlugin
headerPlugin
projectBarPlugin
pagePanelPlugin
pageSettings

export const defaultConfig = {

  /**
   * debug mode
   */
  debug: false,

  /**
   * Grapesjs config
   */
  editor: {
    height: '100%',
    showOffsets: 1,
    showDevices: 1,
    pageManager: true,
    layerManager: {
      appendTo: '.layer-manager-container',
    },
    blockManager: {
      appendTo: '.block-manager-container',
    },
    storageManager: {
      type: 'remote',
      autosave: true, // Store data automatically
      autoload: true, // Autoload stored data on init
      // stepsBeforeSave: 1, // If autosave is enabled, indicates how many changes are necessary before the store method is triggered
      options: {
        remote: {
          // call editor.Storage.get('remote').store(data, editor.Storage.getConfig().options.remote)
          urlLoad: projectEndpoint,
          urlStore: projectEndpoint,
          // As the API stores projects in this format `{id: 1, data: projectData }`,
          // we have to properly update the body before the store and extract the
          // project data from the response result.
          onStore: data => ({ id: projectId, data }),
          onLoad: result => result.data,
        },
      },
    },
    container: '#gjs',

    plugins: [
      'grapesjs-plugin-header',
      'gjs-blocks-basic',
      'project-bar',
      'page-panel',
      'page-settings',
    ],
    pluginsOpts: {
      'gjs-blocks-basic': {
        category: catBasic,
        flexGrid: true,
      },
      'grapesjs-plugin-header': {
        category: catText,
        labelN1: 'Heading 1 (H1)',
        labelN2: 'Heading 2 (H2)',
        labelN3: 'Heading 3 (H3)',
        labelN4: 'Heading 4 (H4)',
        labelN5: 'Heading 5 (H5)',
        labelN6: 'Heading 6 (H6)',
      },
      'project-bar': {
        panels: [
          {
            id: 'dash',
            className: 'logo',
            attributes: { title: 'Go to your dashboard' },
            link: '/',
            command: 'open-dash',
          }, {
            id: 'block-manager-btn',
            className: 'block-manager-btn fa fa-fw fa-plus',
            attributes: { title: 'Insert new elements', containerClassName: 'block-manager-container', },
            command: 'open-blocks',
          }, {
            id: 'layer-manager-btn',
            className: 'layer-manager-btn fa fa-fw fa-list',
            attributes: { title: 'Site layers', containerClassName: 'layer-manager-container', },
            command: 'open-layers',
          }, {
            id: 'page-panel-btn',
            className: 'page-panel-btn fa fa-fw fa-file',
            attributes: { title: 'Show pages', containerClassName: 'page-panel-container', },
            command: 'open-pages',
          },
        ],
      },
      'page-panel': {
        cmdOpenPageSettings,
        appendTo: '.page-panel-container',
      }
    },
  },
}

