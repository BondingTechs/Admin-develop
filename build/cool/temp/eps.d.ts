declare namespace Eps {
    interface AwardTipsEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 建立用戶ID
         */
        createBy?: BigInt;
        /**
         * 更新用戶ID
         */
        updateBy?: BigInt;
        /**
         * 標題
         */
        title?: string;
        /**
         * 縮圖
         */
        thumbnail?: string;
        /**
         * 內容
         */
        content?: mediumtext;
        /**
         * 發布日期
         */
        publishDate?: string;
        /**
         * 狀態
         */
        status?: boolean;
        /**
         * 觀看次數
         */
        views?: number;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface BaseSysDepartmentEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 部門名称
         */
        name?: string;
        /**
         * 上级部門ID
         */
        parentId?: BigInt;
        /**
         * 排序
         */
        orderNum?: number;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface BaseSysLogEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 用户ID
         */
        userId?: BigInt;
        /**
         * 行为
         */
        action?: string;
        /**
         * ip
         */
        ip?: string;
        /**
         * ip地址
         */
        ipAddr?: string;
        /**
         * 参数
         */
        params?: string;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface BaseSysMenuEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 父菜单ID
         */
        parentId?: BigInt;
        /**
         * 菜单名称
         */
        name?: string;
        /**
         * 菜单地址
         */
        router?: string;
        /**
         * 权限标识
         */
        perms?: string;
        /**
         * 类型 0：目录 1：菜单 2：按钮
         */
        type?: number;
        /**
         * 图标
         */
        icon?: string;
        /**
         * 排序
         */
        orderNum?: number;
        /**
         * 视图地址
         */
        viewPath?: string;
        /**
         * 路由缓存
         */
        keepAlive?: boolean;
        /**
         * 是否显示
         */
        isShow?: boolean;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface BaseSysParamEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 键位
         */
        keyName?: string;
        /**
         * 名称
         */
        name?: string;
        /**
         * 数据
         */
        data?: string;
        /**
         * 数据类型 0:字符串 1：数组 2：键值对
         */
        dataType?: number;
        /**
         * 备注
         */
        remark?: string;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface BaseSysRoleEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 用户ID
         */
        userId?: string;
        /**
         * 名称
         */
        name?: string;
        /**
         * 角色标签
         */
        label?: string;
        /**
         * 备注
         */
        remark?: string;
        /**
         * 数据权限是否关联上下级
         */
        relevance?: number;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface BaseSysUserEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 部門ID
         */
        departmentId?: BigInt;
        /**
         * socketId
         */
        socketId?: string;
        /**
         * 用戶名
         */
        username?: string;
        /**
         * 密碼
         */
        password?: string;
        /**
         * 密碼版本, 作用是改完密碼，讓原來的token失效
         */
        passwordV?: number;
        /**
         * 頭像
         */
        avatar?: string;
        /**
         * 姓氏
         */
        firstName?: string;
        /**
         * 名字
         */
        lastName?: string;
        /**
         * 性別 0:男 1:女
         */
        gender?: number;
        /**
         * 生日
         */
        birthday?: string;
        /**
         * 區碼
         */
        area?: string;
        /**
         * 手機
         */
        phone?: string;
        /**
         * Email
         */
        email?: string;
        /**
         * 身分證字號
         */
        idCard?: string;
        /**
         * 身份驗證 dict:審核中.駁回.通過
         */
        identityStatus?: number;
        /**
         * 駁回原因
         */
        rejectReason?: string;
        /**
         * 簡介
         */
        intro?: mediumtext;
        /**
         * 備註
         */
        remark?: string;
        /**
         * Email驗證
         */
        emailStatus?: number;
        /**
         * 狀態 0:禁用 1:啟用
         */
        status?: boolean;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface DemoGoodsEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 标题
         */
        title?: string;
        /**
         * 图片
         */
        pic?: string;
        /**
         * 价格
         */
        price?: number;
        /**
         * 分类 0-衣服 1-鞋子 2-裤子
         */
        type?: number;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface DictInfoEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 類型ID
         */
        typeId?: number;
        /**
         * 名稱
         */
        name?: string;
        /**
         * 排序
         */
        orderNum?: number;
        /**
         * 類型 el-tag
         */
        type?: string;
        /**
         * 備註
         */
        remark?: string;
        /**
         * 父ID
         */
        parentId?: number;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface DictTypeEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 名稱
         */
        name?: string;
        /**
         * 標識
         */
        key?: string;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface IndustryCategoryEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 分類名稱
         */
        name?: string;
        /**
         * 分類代稱
         */
        slug?: string;
        /**
         * 分類描述
         */
        description?: string;
        /**
         * 上層分類
         */
        parentId?: number;
        /**
         * Icon
         */
        icon?: string;
        /**
         * 排序號
         */
        orderNum?: number;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface NewsArticleEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 建立用戶ID
         */
        createBy?: BigInt;
        /**
         * 更新用戶ID
         */
        updateBy?: BigInt;
        /**
         * 刪除用戶ID
         */
        deleteBy?: BigInt;
        /**
         * 刪除時間
         */
        deleteTime?: Date;
        /**
         * 標題
         */
        title?: string;
        /**
         * meta標題
         */
        metaTitle?: string;
        /**
         * meta描述
         */
        metaDescription?: string;
        /**
         * 代稱
         */
        slug?: string;
        /**
         * 完整文章
         */
        content?: mediumtext;
        /**
         * 預覽內容
         */
        contentPreview?: mediumtext;
        /**
         * 摘錄
         */
        excerpt?: string;
        /**
         * 縮圖
         */
        thumbnail?: string;
        /**
         * 開啟評論
         */
        commentOpen?: boolean;
        /**
         * 置頂新聞
         */
        isTop?: boolean;
        /**
         * 熱門新聞
         */
        isHot?: boolean;
        /**
         * 狀態
         */
        status?: boolean;
        /**
         * 發布時間
         */
        publishTime?: Date;
        /**
         * 類型
         */
        type?: number;
        /**
         * 影片網址
         */
        videoUrl?: string;
        /**
         * 作者頭像
         */
        authorAvatar?: string;
        /**
         * 作者姓名
         */
        authorName?: string;
        /**
         * 作者簡介
         */
        authorIntro?: mediumtext;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface NewsArticleCommentEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 建立用戶ID
         */
        createBy?: BigInt;
        /**
         * 更新用戶ID
         */
        updateBy?: BigInt;
        /**
         * 刪除用戶ID
         */
        deleteBy?: BigInt;
        /**
         * 刪除時間
         */
        deleteTime?: Date;
        /**
         * 文章ID
         */
        articleId?: BigInt;
        /**
         * 內容
         */
        content?: string;
        /**
         * 父ID
         */
        parentId?: BigInt;
        /**
         * 用戶ID
         */
        authorId?: BigInt;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface SpaceInfoEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 地址
         */
        url?: string;
        /**
         * 類型
         */
        type?: string;
        /**
         * 分類ID
         */
        classifyId?: BigInt;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface SpaceTypeEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 类别名称
         */
        name?: string;
        /**
         * 父分类ID
         */
        parentId?: number;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }

    interface TaskInfoEntity {
        /**
         * ID
         */
        id?: number;
        /**
         * 任务ID
         */
        jobId?: string;
        /**
         * 任务配置
         */
        repeatConf?: string;
        /**
         * 名称
         */
        name?: string;
        /**
         * cron
         */
        cron?: string;
        /**
         * 最大执行次数 不传为无限次
         */
        limit?: number;
        /**
         * 每间隔多少毫秒执行一次 如果cron设置了 这项设置就无效
         */
        every?: number;
        /**
         * 备注
         */
        remark?: string;
        /**
         * 状态 0:停止 1：运行
         */
        status?: boolean;
        /**
         * 开始时间
         */
        startDate?: Date;
        /**
         * 结束时间
         */
        endDate?: Date;
        /**
         * 数据
         */
        data?: string;
        /**
         * 执行的service实例ID
         */
        service?: string;
        /**
         * 状态 0:系统 1：用户
         */
        type?: number;
        /**
         * 下一次执行时间
         */
        nextRunTime?: Date;
        /**
         * 状态 0:cron 1：时间间隔
         */
        taskType?: number;
        /**
         * 创建时间
         */
        createTime?: Date;
        /**
         * 更新时间
         */
        updateTime?: Date;
        /**
         * 任意键值
         */
        [key: string]: any;
    }
    interface ChatMessage {
        /**
         * list
         */
        list(data?: any): Promise<any[]>;
        /**
         * page
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: any[];
            [key: string]: any;
        }>;
        /**
         * info
         */
        info(data?: any): Promise<any>;
        /**
         * update
         */
        update(data?: any): Promise<any>;
        /**
         * delete
         */
        delete(data?: any): Promise<any>;
        /**
         * add
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            list: string;
            page: string;
            info: string;
            update: string;
            delete: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            list: boolean;
            page: boolean;
            info: boolean;
            update: boolean;
            delete: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface ChatSession {
        /**
         * list
         */
        list(data?: any): Promise<any[]>;
        /**
         * page
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: any[];
            [key: string]: any;
        }>;
        /**
         * info
         */
        info(data?: any): Promise<any>;
        /**
         * update
         */
        update(data?: any): Promise<any>;
        /**
         * delete
         */
        delete(data?: any): Promise<any>;
        /**
         * add
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            list: string;
            page: string;
            info: string;
            update: string;
            delete: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            list: boolean;
            page: boolean;
            info: boolean;
            update: boolean;
            delete: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface Test {
        /**
         * list
         */
        list(data?: any): Promise<any[]>;
        /**
         * page
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: any[];
            [key: string]: any;
        }>;
        /**
         * info
         */
        info(data?: any): Promise<any>;
        /**
         * update
         */
        update(data?: any): Promise<any>;
        /**
         * delete
         */
        delete(data?: any): Promise<any>;
        /**
         * add
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            list: string;
            page: string;
            info: string;
            update: string;
            delete: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            list: boolean;
            page: boolean;
            info: boolean;
            update: boolean;
            delete: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface AwardTips {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<AwardTipsEntity>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<AwardTipsEntity[]>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: AwardTipsEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            info: string;
            list: string;
            page: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            info: boolean;
            list: boolean;
            page: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface BaseComm {
        /**
         * 修改个人信息
         */
        personUpdate(data?: any): Promise<any>;
        /**
         * 文件上传模式
         */
        uploadMode(data?: any): Promise<any>;
        /**
         * 权限与菜单
         */
        permmenu(data?: any): Promise<any>;
        /**
         * 个人信息
         */
        person(data?: any): Promise<any>;
        /**
         * 文件上传
         */
        upload(data?: any): Promise<any>;
        /**
         * 退出
         */
        logout(data?: any): Promise<any>;
        /**
         * list
         */
        list(data?: any): Promise<any[]>;
        /**
         * page
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: any[];
            [key: string]: any;
        }>;
        /**
         * info
         */
        info(data?: any): Promise<any>;
        /**
         * update
         */
        update(data?: any): Promise<any>;
        /**
         * delete
         */
        delete(data?: any): Promise<any>;
        /**
         * add
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            personUpdate: string;
            uploadMode: string;
            permmenu: string;
            person: string;
            upload: string;
            logout: string;
            list: string;
            page: string;
            info: string;
            update: string;
            delete: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            personUpdate: boolean;
            uploadMode: boolean;
            permmenu: boolean;
            person: boolean;
            upload: boolean;
            logout: boolean;
            list: boolean;
            page: boolean;
            info: boolean;
            update: boolean;
            delete: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface BaseOpen {
        /**
         * 刷新token
         */
        refreshToken(data?: any): Promise<any>;
        /**
         * 验证码
         */
        captcha(data?: any): Promise<any>;
        /**
         * 登录
         */
        login(data?: any): Promise<any>;
        /**
         * 获得网页内容的参数值
         */
        html(data?: any): Promise<any>;
        /**
         * 实体信息与路径
         */
        eps(data?: any): Promise<any>;
        /**
         * list
         */
        list(data?: any): Promise<any[]>;
        /**
         * page
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: any[];
            [key: string]: any;
        }>;
        /**
         * info
         */
        info(data?: any): Promise<any>;
        /**
         * update
         */
        update(data?: any): Promise<any>;
        /**
         * delete
         */
        delete(data?: any): Promise<any>;
        /**
         * add
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            refreshToken: string;
            captcha: string;
            login: string;
            html: string;
            eps: string;
            list: string;
            page: string;
            info: string;
            update: string;
            delete: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            refreshToken: boolean;
            captcha: boolean;
            login: boolean;
            html: boolean;
            eps: boolean;
            list: boolean;
            page: boolean;
            info: boolean;
            update: boolean;
            delete: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface BaseSysDepartment {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 排序
         */
        order(data?: any): Promise<any>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<BaseSysDepartmentEntity[]>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * page
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: BaseSysDepartmentEntity[];
            [key: string]: any;
        }>;
        /**
         * info
         */
        info(data?: any): Promise<BaseSysDepartmentEntity>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            order: string;
            list: string;
            add: string;
            page: string;
            info: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            order: boolean;
            list: boolean;
            add: boolean;
            page: boolean;
            info: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface BaseSysLog {
        /**
         * 日志保存时间
         */
        setKeep(data?: any): Promise<any>;
        /**
         * 获得日志保存时间
         */
        getKeep(data?: any): Promise<any>;
        /**
         * 清理
         */
        clear(data?: any): Promise<any>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: BaseSysLogEntity[];
            [key: string]: any;
        }>;
        /**
         * list
         */
        list(data?: any): Promise<BaseSysLogEntity[]>;
        /**
         * info
         */
        info(data?: any): Promise<BaseSysLogEntity>;
        /**
         * update
         */
        update(data?: any): Promise<any>;
        /**
         * delete
         */
        delete(data?: any): Promise<any>;
        /**
         * add
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            setKeep: string;
            getKeep: string;
            clear: string;
            page: string;
            list: string;
            info: string;
            update: string;
            delete: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            setKeep: boolean;
            getKeep: boolean;
            clear: boolean;
            page: boolean;
            list: boolean;
            info: boolean;
            update: boolean;
            delete: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface BaseSysMenu {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<BaseSysMenuEntity>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<BaseSysMenuEntity[]>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: BaseSysMenuEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            info: string;
            list: string;
            page: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            info: boolean;
            list: boolean;
            page: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface BaseSysParam {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 获得网页内容的参数值
         */
        html(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<BaseSysParamEntity>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: BaseSysParamEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * list
         */
        list(data?: any): Promise<BaseSysParamEntity[]>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            html: string;
            info: string;
            page: string;
            add: string;
            list: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            html: boolean;
            info: boolean;
            page: boolean;
            add: boolean;
            list: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface BaseSysRole {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<BaseSysRoleEntity>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<BaseSysRoleEntity[]>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: BaseSysRoleEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            info: string;
            list: string;
            page: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            info: boolean;
            list: boolean;
            page: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface BaseSysUser {
        /**
         * 同意身份驗證
         */
        identityAgree(data?: any): Promise<any>;
        /**
         * 查看身份驗證
         */
        getIdentity(data?: any): Promise<any>;
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 移动部門
         */
        move(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<BaseSysUserEntity>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<BaseSysUserEntity[]>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: BaseSysUserEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            identityAgree: string;
            getIdentity: string;
            delete: string;
            update: string;
            move: string;
            info: string;
            list: string;
            page: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            identityAgree: boolean;
            getIdentity: boolean;
            delete: boolean;
            update: boolean;
            move: boolean;
            info: boolean;
            list: boolean;
            page: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface DemoGoods {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<DemoGoodsEntity>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: DemoGoodsEntity[];
            [key: string]: any;
        }>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<DemoGoodsEntity[]>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            info: string;
            page: string;
            list: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            info: boolean;
            page: boolean;
            list: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface DictInfo {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 获得字典数据
         */
        data(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<DictInfoEntity>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<DictInfoEntity[]>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: DictInfoEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            data: string;
            info: string;
            list: string;
            page: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            data: boolean;
            info: boolean;
            list: boolean;
            page: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface DictType {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<DictTypeEntity>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<DictTypeEntity[]>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: DictTypeEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            info: string;
            list: string;
            page: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            info: boolean;
            list: boolean;
            page: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface IndustryCategory {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<IndustryCategoryEntity>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<IndustryCategoryEntity[]>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: IndustryCategoryEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            info: string;
            list: string;
            page: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            info: boolean;
            list: boolean;
            page: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface NewsArticle {
        /**
         * 閱讀紀錄
         */
        collections(data?: any): Promise<any>;
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 閱讀紀錄
         */
        views(data?: any): Promise<any>;
        /**
         * 閱讀紀錄
         */
        likes(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<NewsArticleEntity>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<NewsArticleEntity[]>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: NewsArticleEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            collections: string;
            delete: string;
            update: string;
            views: string;
            likes: string;
            info: string;
            list: string;
            page: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            collections: boolean;
            delete: boolean;
            update: boolean;
            views: boolean;
            likes: boolean;
            info: boolean;
            list: boolean;
            page: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface NewsComment {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<NewsArticleCommentEntity>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<NewsArticleCommentEntity[]>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: NewsArticleCommentEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            info: string;
            list: string;
            page: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            info: boolean;
            list: boolean;
            page: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface SpaceInfo {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<SpaceInfoEntity>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<SpaceInfoEntity[]>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: SpaceInfoEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            info: string;
            list: string;
            page: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            info: boolean;
            list: boolean;
            page: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface SpaceType {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<SpaceTypeEntity>;
        /**
         * 列表查询
         */
        list(data?: any): Promise<SpaceTypeEntity[]>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: SpaceTypeEntity[];
            [key: string]: any;
        }>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            info: string;
            list: string;
            page: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            info: boolean;
            list: boolean;
            page: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface TaskInfo {
        /**
         * 删除
         */
        delete(data?: any): Promise<any>;
        /**
         * 修改
         */
        update(data?: any): Promise<any>;
        /**
         * 开始
         */
        start(data?: any): Promise<any>;
        /**
         * 执行一次
         */
        once(data?: any): Promise<any>;
        /**
         * 停止
         */
        stop(data?: any): Promise<any>;
        /**
         * 单个信息
         */
        info(data?: any): Promise<TaskInfoEntity>;
        /**
         * 分页查询
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: TaskInfoEntity[];
            [key: string]: any;
        }>;
        /**
         * 日志
         */
        log(data?: any): Promise<any>;
        /**
         * 新增
         */
        add(data?: any): Promise<any>;
        /**
         * list
         */
        list(data?: any): Promise<TaskInfoEntity[]>;
        /**
         * 权限标识
         */
        permission: {
            delete: string;
            update: string;
            start: string;
            once: string;
            stop: string;
            info: string;
            page: string;
            log: string;
            add: string;
            list: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            delete: boolean;
            update: boolean;
            start: boolean;
            once: boolean;
            stop: boolean;
            info: boolean;
            page: boolean;
            log: boolean;
            add: boolean;
            list: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    interface TipIndex {
        /**
         * list
         */
        list(data?: any): Promise<any[]>;
        /**
         * page
         */
        page(data?: any): Promise<{
            pagination: { size: number; page: number; total: number };
            list: any[];
            [key: string]: any;
        }>;
        /**
         * info
         */
        info(data?: any): Promise<any>;
        /**
         * update
         */
        update(data?: any): Promise<any>;
        /**
         * delete
         */
        delete(data?: any): Promise<any>;
        /**
         * add
         */
        add(data?: any): Promise<any>;
        /**
         * 权限标识
         */
        permission: {
            list: string;
            page: string;
            info: string;
            update: string;
            delete: string;
            add: string;
        };
        /**
         * 权限状态
         */
        _permission: {
            list: boolean;
            page: boolean;
            info: boolean;
            update: boolean;
            delete: boolean;
            add: boolean;
        };
        /**
         * 請求
         */
        request: Service["request"];
    }

    type Service = {
        request(options: {
            url: string;
            method?: "POST" | "GET" | string;
            data?: any;
            params?: any;
            proxy?: boolean;
            [key: string]: any;
        }): Promise<any>;
        chat: { message: ChatMessage; session: ChatSession };
        test: Test;
        award: { tips: AwardTips };
        base: {
            comm: BaseComm;
            open: BaseOpen;
            sys: {
                department: BaseSysDepartment;
                log: BaseSysLog;
                menu: BaseSysMenu;
                param: BaseSysParam;
                role: BaseSysRole;
                user: BaseSysUser;
            };
        };
        demo: { goods: DemoGoods };
        dict: { info: DictInfo; type: DictType };
        industry: { category: IndustryCategory };
        news: { article: NewsArticle; comment: NewsComment };
        space: { info: SpaceInfo; type: SpaceType };
        task: { info: TaskInfo };
        tip: { index: TipIndex };
    };
}
