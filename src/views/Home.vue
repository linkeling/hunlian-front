<template>
    <a-layout class="home_layout">
        <a-layout-sider width="300px" v-model="collapsed">
            <div class="system_name">云南省免费提供避孕药具服务平台</div>
            <a-menu mode="inline" :open-keys="openKeys" @openChange="onOpenChange" v-model="activeItem">
                <template v-for="item1 in menuList">
                    <a-menu-item v-if="item1.children!== undefined && item1.children.length === 0" :key="item1.path"
                                 @click="clickMenuItem(item1)">
                        <a-icon :type="item1.icon"/>
                        <span>{{item1.menuName}}</span>
                    </a-menu-item>
                    <a-sub-menu v-else :key="item1.id">
                        <span slot="title"><a-icon :type="item1.icon"/><span>{{item1.menuName}}</span></span>
                        <a-menu-item v-for="item2 in item1.children" :key="item2.path" @click="clickMenuItem(item2)">
                            {{item2.menuName}}
                        </a-menu-item>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header>
                <div>
                    <a-icon class="iconfront" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                            @click="() => (collapsed = !collapsed)"></a-icon>
                    <span class="system_type">{{systemType}}</span>
                </div>
                <div>
                    <a-button type="link" @click="logout">退出登录</a-button>
                </div>
            </a-layout-header>
            <a-layout-content class="layout_container">
                <a-tabs type="editable-card" hideAdd size="small" v-model="activeKey" @edit="editTabs"
                        @change="onChange">
                    <a-tab-pane v-for="(item, index) in tabs" :key="item.key" :tab="item.title"
                                :closable="index != 0"></a-tab-pane>
                </a-tabs>
                <a-card>
                    <router-view></router-view>
                </a-card>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
    const unitTabs = [
        {
            title: '首页',
            key: '1',
            path: '/Home/index',
            parent: null,
        }
    ]
    const unitActiveKey = '1'
    const netWorkActiveKey = '80'
    export default {
        data() {
            return {
                // 控制菜单折叠
                collapsed: false,
                // 菜单
                menuList: [
                    {
                        menuName: '基本信息管理',icon:'bars', children: [{id:'1',menuName:"客户信息审核",path:'customInfoPage'}]
                    },
                ],
                // 默认展开菜单
                openKeys: [],
                // 选中的菜单
                activeItem: [],
                // tabs标签
                tabs: [],
                // 选中的tabs标签
                activeKey: '',
                // 系统
                systemType: '',
            }
        },
        created() {
            this.systemType = '单位管理端';
            this.tabs = JSON.parse(JSON.stringify(unitTabs));
            this.activeKey = unitActiveKey
            const openKeys = Number(window.sessionStorage.getItem('openKeys'));
            this.openKeys = [openKeys];
            const activeItem = window.sessionStorage.getItem('activeItem');
            this.activeItem = [activeItem];
            const tabs = JSON.parse(window.sessionStorage.getItem('tabs'));
            if (tabs) {
                this.tabs = tabs;
            }
            const activeKey = window.sessionStorage.getItem('activeKey');
            if (activeKey) {
                this.activeKey = activeKey;
            }
        },
        methods: {
            // 点击二级菜单或无子菜单的一级菜单
            clickMenuItem(item) {
                this.$router.push(item.path);
                window.sessionStorage.setItem('openKeys', item.parentId);
                window.sessionStorage.setItem('activeItem', item.path);
                let tabs = {title: item.menuName, key: item.id + '', path: item.path, parent: item.parentId};
                this.activeKey = tabs.key;
                window.sessionStorage.setItem('activeKey', this.activeKey);
                for (let i = 0; i < this.tabs.length; i++) {
                    if (this.tabs[i].key === tabs.key) {
                        return false;
                    }
                }
                this.tabs.push(tabs);
                window.sessionStorage.setItem('tabs', JSON.stringify(this.tabs));
            },
            // 控制只展开一个菜单
            onOpenChange(openKeys) {
                this.openKeys = [];
                if (openKeys.length > 0) {
                    this.openKeys.push(openKeys[openKeys.length - 1]);
                }
                ;
            },
            // 新增或删除tabs标签
            editTabs(targetKey) {
                this.tabs.forEach((item, i) => {
                    if (item.key === targetKey) {
                        this.tabs.splice(i, 1);
                        window.sessionStorage.setItem('tabs', JSON.stringify(this.tabs));
                        if (item.key === this.activeKey) {
                            this.activeKey = this.tabs[i - 1].key;
                            window.sessionStorage.setItem('activeKey', this.activeKey);
                            this.activeItem = [this.tabs[i - 1].path];
                            window.sessionStorage.setItem('activeItem', this.activeItem);
                            if (this.tabs[i - 1].parent) {
                                this.openKeys = [this.tabs[i - 1].parent];
                            } else {
                                this.openKeys = [];
                            }
                            ;
                            window.sessionStorage.setItem('openKeys', this.openKeys);
                            this.$router.push(this.tabs[i - 1].path);
                        }
                    }
                });
            },
            // 点击tabs标签
            onChange(activeKey) {
                this.activeKey = activeKey;
                window.sessionStorage.setItem('activeKey', this.activeKey);
                this.tabs.forEach((item, i) => {
                    if (item.key === activeKey) {
                        if (item.parent) {
                            this.openKeys = [item.parent];

                        } else {
                            this.openKeys = [];
                        }
                        window.sessionStorage.setItem('openKeys', this.openKeys);
                        this.activeItem = [item.path];
                        window.sessionStorage.setItem('activeItem', this.activeItem);
                        this.$router.push(item.path);

                    }
                });
            },
            // 退出登录
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/');
            },
        },
    }
</script>
<style lang="less" scoped>
    .ant-layout {
        height: 100%;
    }

    .ant-layout-sider {
        background: #fff;

        .system_name {
            font-size: 16px;
            font-weight: bold;
            color: rgb(51, 51, 51);
            height: 64px;
            line-height: 64px;
            text-align: center;
            margin-bottom: 10px;
            overflow: hidden;
            box-shadow: rgb(225, 225, 225) 0px 2px 8px;
        }

    }

    .ant-layout-header {
        background: #fff;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .iconfront {
            font-size: 18px;
        }

        .iconfront:hover {
            color: #1890ff;
        }

        .system_type {
            font-size: 16px;
            font-weight: bold;
            color: rgb(51, 51, 51);
            margin-left: 25px;
        }
    }

    .ant-menu {
        border-right: 0;
        // height: 100%;
    }

    .ant-layout-content {
        padding: 10px;
    }

    .ant-card {
        height: calc(100% - 44px);
        overflow-y: auto;
    }
</style>

<style lang="less">
    .layout_container .ant-tabs.ant-tabs-card .ant-tabs-card-bar {
        border: none;
        // border-bottom: 2px solid #1890ff;
        margin: 0;
    }

    .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
        // border: 0;
        margin-right: 0px;
        color: #1890ff;

        .ant-tabs-close-x {
            color: #1890ff;
            margin-left: 10px;
        }
    }

    .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
        color: #fff;
        background: #1890ff;

        .ant-tabs-close-x {
            color: #fff;
            margin-left: 10px;
        }
    }
</style>
