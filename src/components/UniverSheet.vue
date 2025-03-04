<template>
  <div ref="container" class="univer-container"></div>
</template>

<script>
import { Univer, UniverInstanceType, LocaleType } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsFormulaUIPlugin } from "@univerjs/sheets-formula-ui";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { UniverUIPlugin } from "@univerjs/ui";

/**
 * 
 * The ability to import locales from virtual modules and automatically import styles is provided by Univer Plugins. For more details, please refer to: https://univer.ai/guides/sheet/advanced/univer-plugins.
 * If you encounter issues while using the plugin or have difficulty understanding how to use it, please disable Univer Plugins and manually import the language packs and styles.
 * 
 * 【从虚拟模块导入语言包】以及【自动导入样式】是由 Univer Plugins 提供的能力，详情参考：https://univer.ai/zh-CN/guides/sheet/advanced/univer-plugins
 * 如果您在使用该插件的时候出现了问题，或者无法理解如何使用，请禁用 Univer Plugins，并手动导入语言包和样式
 */ 
import { zhCN, enUS } from 'univer:locales'
// TODO:
import "@univerjs/sheets-ui/lib/index.css";

export default {
  name: 'UniverSheet',
  props: {
    // workbook data
    data: {
      value: Object,
      default: () => ({}),
    },
  },
  watch: {
    // watch data change, and re-create univer instance
    data: {
      handler (val) {
        this.destroyUniver();
        this.init(val);
      },
      immediate: true,
    },
  },
  data () {
    return {
      // univer instance
      univer: null,
      // workbook instance
      workbook: null,
    };
  },
  mounted () {
    this.init(this.data);
  },
  methods: {
    /**
     * Initialize univer instance and workbook instance
     * @param data {IWorkbookData} document see https://univer.work/api/core/interfaces/IWorkbookData.html
     */
     init (data = {}) {
      const univer = new Univer({
        theme: defaultTheme,
        locale: LocaleType.EN_US,
        locales: {
          [LocaleType.ZH_CN]: zhCN,
          [LocaleType.EN_US]: enUS,
        },
      });
      this.univer = univer;

      // core plugins
      univer.registerPlugin(UniverRenderEnginePlugin);
      univer.registerPlugin(UniverFormulaEnginePlugin);
      univer.registerPlugin(UniverUIPlugin, {
        container: this.$refs.container,
      });

      // doc plugins
      univer.registerPlugin(UniverDocsPlugin, {
        hasScroll: false,
      });
      univer.registerPlugin(UniverDocsUIPlugin);

      // sheet plugins
      univer.registerPlugin(UniverSheetsPlugin);
      univer.registerPlugin(UniverSheetsUIPlugin);
      univer.registerPlugin(UniverSheetsFormulaPlugin);
      univer.registerPlugin(UniverSheetsFormulaUIPlugin);

      // create workbook instance
      this.workbook = univer.createUnit(UniverInstanceType.UNIVER_SHEET, data);
    },
    /**
     * Destroy univer instance and workbook instance
     */
    destroyUniver () {
      this.univer?.dispose();
      this.univer = null;
      this.workbook = null;
    },
    /**
     * Get workbook data
     */
    getData () {
      if (!this.workbook) {
        throw new Error('Workbook is not initialized');
      }
      return this.workbook.save();
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.univer-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Also hide the menubar */
:global(.univer-menubar) {
  display: none;
}
</style>
