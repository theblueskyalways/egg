// 后台错误码
const errorList = {
  2000: {
    'exception_type': 'SERVER_BUSY',
    'message_zh-CN': '服务器繁忙',
    'message_en-US': 'The server is busy now',
  },
  2001: {
    'exception_type': 'INVALID_PARAM',
    'message_zh-CN': '参数错误',
    'message_en-US': 'Parameter Error',
  },
  2002: {
    'exception_type': 'USER_NOT_PERMITTED',
    'message_zh-CN': '所在的用户组没有权限',
    'message_en-US': 'The user group do not have permissions',
  },
  2003: {
    'exception_type': 'NO_PERMISSION',
    'message_zh-CN': '无权访问',
    'message_en-US': 'No permission',
  },
  2004: {
    'exception_type': 'NO_NETWORK',
    'message_zh-CN': '无网络连接',
    'message_en-US': 'NO_NETWORK',
  },
  3001: {
    'exception_type': 'ACCOUNT_LOGIN_FAILED',
    'message_zh-CN': '用户登录失败',
    'message_en-US': 'Failed to login',
  },
  3002: {
    'exception_type': 'ACCOUNT_NOT_FOUND',
    'message_zh-CN': '账户不存在，请联系管理员',
    'message_en-US': 'Non-existent account, please contact administrator',
  },
  3003: {
    'exception_type': 'SMS_REQUESTED_TOO_SOON',
    'message_zh-CN': '验证码已发送，请不要重复发送',
    'message_en-US': 'The verification code has been sent, please do not try to repeat',
  },
  3004: {
    'exception_type': 'SEND_SMS_CODE_FAILED',
    'message_zh-CN': '验证码发送失败，请重试',
    'message_en-US': 'The verification code failed to send, please try again',
  },
  3005: {
    'exception_type': 'ACCOUNT_LOGOUT_FAILED',
    'message_zh-CN': '用户退出失败',
    'message_en-US': 'Failed to exit',
  },
  3007: {
    'exception_type': 'UPDATE_USER_FAILED',
    'message_zh-CN': '编辑用户失败',
    'message_en-US': 'Failed to edit user information',
  },
  3008: {
    'exception_type': 'ADD_USER_FAILED',
    'message_zh-CN': '创建用户失败',
    'message_en-US': 'Failed to create new account',
  },
  3009: {
    'exception_type': 'OLD_PASSWORD_UNMATCHED',
    'message_zh-CN': '原密码不匹配',
    'message_en-US': 'Password entered and original password do not match',
  },
  3010: {
    'exception_type': 'CHANGE_PASSWORD_FAILED',
    'message_zh-CN': '修改密码失败',
    'message_en-US': 'Failed to change password',
  },
  3011: {
    'exception_type': 'OPERATION_FAILED',
    'message_zh-CN': '操作失败',
    'message_en-US': 'Operation failed',
  },
  3012: {
    'exception_type': 'COUNT_USER_FAILED',
    'message_zh-CN': '用户计数失败',
    'message_en-US': 'Failed to count user',
  },
  3013: {
    'exception_type': 'LIST_USER_FAILED',
    'message_zh-CN': '查询用户失败',
    'message_en-US': 'Failed to list user',
  },
  3014: {
    'exception_type': 'GET_USER_SETTINGS_FAILED',
    'message_zh-CN': '获取用户设置信息失败',
    'message_en-US': 'Failed to get user settings',
  },
  3015: {
    'exception_type': 'GET_PERSON_STAND_FAILED',
    'message_zh-CN': '获取员工站立数据失败',
    'message_en-US': 'Failed to get person stand rank information',
  },
  3016: {
    'exception_type': 'GET_PERSON_STAND_RANK_FAILED',
    'message_zh-CN': '获取员工站立排行数据失败',
    'message_en-US': 'Failed to get person stand rank information',
  },
  3017: {
    'exception_type': 'GET_QINIU_TOKEN_FAILED',
    'message_zh-CN': '获取七牛云上传图片 token 失败',
    'message_en-US': 'Failed to get qiniu cloud upload image token',
  },
  3018: {
    'exception_type': 'DELETE_USER_FAILED',
    'message_zh-CN': '删除用户失败',
    'message_en-US': 'Failed to delete user',
  },
  3019: {
    'exception_type': 'TELEPHONE_ALREADY_EXISTS',
    'message_zh-CN': '手机号码已存在',
    'message_en-US': 'Telephone already exists',
  },
  3020: {
    'exception_type': 'WRONG_PASSWORD',
    'message_zh-CN': '密码错误',
    'message_en-US': 'Wrong password',
  },
  3021: {
    'exception_type': 'USER_LOGGED_IN_AND_CANNOT_BE_DELETE',
    'message_zh-CN': '用户已登录，不能删除',
    'message_en-US': 'User is logged in and cannot be deleted',
  },
  3022: {
    'exception_type': 'CODE_NOT_VERIFIED',
    'message_zh-CN': '验证码不正确，请重新输入',
    'message_en-US': 'The verification id is incorrect. Please re-enter',
  },
  3023: {
    'exception_type': 'CODE_HAS_EXPIRED',
    'message_zh-CN': '验证码已失效，请重新请求验证码',
    'message_en-US': 'The verification id has expired. Please request a verification id again',
  },
  3024: {
    'exception_type': 'LOGGING_FAILED_FOR_USER_NOT_IN_COMPANY',
    'message_zh-CN': '账号不存在，请联系管理员',
    'message_en-US': 'Non-existent account, please contact administrator',
  },
  3025: {
    'exception_type': 'RESOURCE_IS_IN_USE',
    'message_zh-CN': '资源已被其他人使用',
    'message_en-US': 'Resources have been used by others',
  },
  3026: {
    'exception_type': 'PUSHTODEVICE_NOTIFICATION_FAILED',
    'message_zh-CN': '推送消息失败',
    'message_en-US': 'Push message failed',
  },
  3027: {
    'exception_type': 'EMAIL_ERR',
    'message_zh-CN': '邮箱格式错误',
    'message_en-US': 'Email format error',
  },
  3028: {
    'exception_type': 'SEND_EMAIL_FAILED',
    'message_zh-CN': '发送邮件失败',
    'message_en-US': 'Failed to send mail',
  },
  3029: {
    'exception_type': 'USER_NOT_ADMIN',
    'message_zh-CN': '用户不是管理员',
    'message_en-US': 'User is not an administrator',
  },
  3030: {
    'exception_type': 'RETRIEVE_PASSWORD_LINK_EXPIRED',
    'message_zh-CN': '密码找回链接无效或已过期',
    'message_en-US': 'Password recovery link is invalid or has expired',
  },
  3031: {
    'exception_type': 'GET_SVG_FAILED',
    'message_zh-CN': '获取 SVG 失败',
    'message_en-US': 'Failed to get SVG',
  },
  3032: {
    'exception_type': 'EXCEL_FORMAT_WRONG',
    'message_zh-CN': 'Excel 格式错误',
    'message_en-US': 'Excel format error',
  },
  3033: {
    'exception_type': 'EXCEL_TEMPLATE_WRONG',
    'message_zh-CN': 'Excel 模板错误',
    'message_en-US': 'Excel template error',
  },
  3034: {
    'exception_type': 'EXCEL_EMPTY',
    'message_zh-CN': 'Excel 为空',
    'message_en-US': 'Excel is empty',
  },
  3035: {
    'exception_type': 'ADD_USER_GROUP_FAILED',
    'message_zh-CN': '增加用户组失败',
    'message_en-US': 'Add user group failed',
  },
  3036: {
    'exception_type': 'DELETE_USER_GROUP_FAILED',
    'message_zh-CN': '删除用户组失败',
    'message_en-US': 'Delete user group failed',
  },
  3037: {
    'exception_type': 'NOT_FOUND_COMPANY_FOR_USER',
    'message_zh-CN': '未找到此用户的公司信息',
    'message_en-US': 'Not found company information for this user',
  },
  3038: {
    'exception_type': 'NOT_LOGGED_IN',
    'message_zh-CN': '未登录',
    'message_en-US': 'Not logged in yet',
  },
  3039: {
    'exception_type': 'SET_ROLE_FAILED',
    'message_zh-CN': '设置用户角色失败',
    'message_en-US': 'Set role failed',
  },
  3040: {
    'exception_type': 'GET_SIDEBAR_FAILED',
    'message_zh-CN': '获取侧边栏失败',
    'message_en-US': 'Get sidebar failed',
  },
  3041: {
    'exception_type': 'TOKEN_INVALID',
    'message_zh-CN': 'Token 失效',
    'message_en-US': 'Token is invalid',
  },
  3042: {
    'exception_type': 'COMPANY_DOES_NOT_EXIST',
    'message_zh-CN': '公司不存在',
    'message_en-US': 'Company does not exist',
  },
  3043: {
    'exception_type': 'CANNOT_CREATE_USER_WITHOUT_A_COMPANY',
    'message_zh-CN': '不允许创建不在任何公司的人员',
    'message_en-US': 'cannot create user without a company',
  },
  3044: {
    'exception_type': 'PHONE_AND_EMAIL_DO_NOT_MATCH',
    'message_zh-CN': '该手机已绑定其他企业的身份，您可以更换手机或者输入与该手机匹配的邮箱',
    'message_en-US': 'Phone and email do not match',
  },
  3045: {
    'exception_type': 'CANNOT_ADD_DUPLICATE_USER',
    'message_zh-CN': '不能创建重复用户',
    'message_en-US': ' Cannot add duplicate user',
  },
  3046: {
    'exception_type': 'PHONE_IS_WRONG_OR_EMAIL_IS_ALREADY_USED',
    'message_zh-CN': '电话错误或邮箱已被使用',
    'message_en-US': 'Phone is wrong or email is already used',
  },
  3047: {
    'exception_type': 'EMAIL_IS_ALREADY_USED',
    'message_zh-CN': '邮箱已被使用',
    'message_en-US': 'Email is already used',
  },
  3048: {
    'exception_type': 'MOVE_USER_FROM_GROUP_FAILED',
    'message_zh-CN': '用户移出某个组失败',
    'message_en-US': 'Fail to delete from group',
  },
  3049: {
    'exception_type': 'MOVE_USER_TO_GROUP_FAILED',
    'message_zh-CN': '用户移入某个组失败',
    'message_en-US': 'Fail to add to group',
  },
  3050: {
    'exception_type': 'GET_GROUP_IDS_FAILED',
    'message_zh-CN': '获取用户组id列表失败',
    'message_en-US': 'Fail to get group ids',
  },
  3051: {
    'exception_type': 'GET_USER_INFO_FAILED',
    'message_zh-CN': '获取用户个人信息失败',
    'message_en-US': 'Fail to get user info',
  },
  3052: {
    'exception_type': 'UPDATE_USER_INFO_FAILED',
    'message_zh-CN': '更新用户个人信息失败',
    'message_en-US': 'Fail to update user info',
  },
  4001: {
    'exception_type': 'COMPANY_ACCOUNT_ALREADY_EXISTS',
    'message_zh-CN': '账户已存在',
    'message_en-US': 'Account already exists',
  },
  4002: {
    'exception_type': 'COMPANY_NAME_ALREADY_EXISTS',
    'message_zh-CN': '公司名称已存在',
    'message_en-US': 'Company name already exists',
  },
  4003: {
    'exception_type': 'ADD_COMPANY_FAILED',
    'message_zh-CN': '创建公司失败',
    'message_en-US': 'Failed to add company',
  },
  4004: {
    'exception_type': 'ADD_COMPANY_ADMIN_FAILED',
    'message_zh-CN': '创建管理员失败',
    'message_en-US': 'Failed to add admin',
  },
  4005: {
    'exception_type': 'EDIT_COMPANY_FAILED',
    'message_zh-CN': '编辑公司失败',
    'message_en-US': 'Failed to edit company',
  },
  4006: {
    'exception_type': 'RESET_PASSWORD_FAILED',
    'message_zh-CN': '重置密码失败',
    'message_en-US': 'Failed to reset the password',
  },
  4007: {
    'exception_type': 'GET_COMPANY_STAND_FAILED',
    'message_zh-CN': '获取公司站立数据失败',
    'message_en-US': 'Failed to get company stand information',
  },
  4008: {
    'exception_type': 'GET_COMPANY_STAND_TREND_FAILED',
    'message_zh-CN': '获取公司站立趋势数据失败',
    'message_en-US': 'Failed to get company stand trend information',
  },
  4009: {
    'exception_type': 'WRONG_STATISTIC_TIME_FORMAT',
    'message_zh-CN': '统计时间格式错误',
    'message_en-US': 'Wrong statistic time format',
  },
  5001: {
    'exception_type': 'HEARTBEAT_FAILED',
    'message_zh-CN': '心跳更新数据失败',
    'message_en-US': 'Failed to update with heartbeat data',
  },
  5002: {
    'exception_type': 'DESK_STATUS_CHANGE_FAILED',
    'message_zh-CN': '更改桌子状态失败',
    'message_en-US': 'Failed to change desk status',
  },
  5003: {
    'exception_type': 'UPDATE_USER_SETTINGS_FAILED',
    'message_zh-CN': '更新用户设置信息失败',
    'message_en-US': 'Failed to update user settings',
  },
  5004: {
    'exception_type': 'GET_BLUETOOTH_INFO_FAILED',
    'message_zh-CN': '获取设备蓝牙信息失败',
    'message_en-US': 'Failed to get device Bluetooth information',
  },
  5005: {
    'exception_type': 'UPLOAD_METRICS_FAILED',
    'message_zh-CN': '上传埋点失败',
    'message_en-US': 'Failed to upload metrics',
  },
  5006: {
    'exception_type': 'GET_DSHOW_VERSION_FAILED',
    'message_zh-CN': '获取 DShow 版本失败',
    'message_en-US': 'Failed to get DShow version',
  },
  6001: {
    'exception_type': 'COUNT_RESOURCE_FAILED',
    'message_zh-CN': '资源计数失败',
    'message_en-US': 'Failed to count resources',
  },
  6002: {
    'exception_type': 'RESOURCE_IN_USE_AND_CANNOT_BE_REMOVE',
    'message_zh-CN': '资源正在使用中，不能移除',
    'message_en-US': 'Resource is in use and cannot be removed',
  },
  7001: {
    'exception_type': 'UPDATE_USER_NOTIFICATION_STATUS_FAILED',
    'message_zh-CN': '修改用户消息状态失败',
    'message_en-US': 'Failed to modify user notice status',
  },
  7002: {
    'exception_type': 'ADD_NOTIFICATION_FAILED',
    'message_zh-CN': '创建消息失败',
    'message_en-US': 'Failed to create notice',
  },
  7003: {
    'exception_type': 'GET_NOTIFICATION_LIST_BY_USER_FAILED',
    'message_zh-CN': '获取用户消息列表失败',
    'message_en-US': 'Failed to get user notice list',
  },
  7004: {
    'exception_type': 'GET_NOTIFICATION_USER_STATUS_LIST_FAILED',
    'message_zh-CN': '获取通知的用户查看状态列表失败',
    'message_en-US': 'Failed to get notification user status list',
  },
  7005: {
    'exception_type': 'UNBIND_DEVICE_FAILED',
    'message_zh-CN': '解除设备绑定失败',
    'message_en-US': 'Failed to unbind device',
  },
  7006: {
    'exception_type': 'UPDATE_RESOURCE_REMARK_FAILED',
    'message_zh-CN': '修改资源备注失败',
    'message_en-US': 'Failed to update resource remark',
  },
  7007: {
    'exception_type': 'GET_NOTIFICATION_FAILED',
    'message_zh-CN': '获取消息失败',
    'message_en-US': 'Failed to get notification',
  },
  8001: {
    'exception_type': 'ADD_BANNER_FAILED',
    'message_zh-CN': '新增 Banner 失败',
    'message_en-US': 'Failed to add Banner',
  },
  8002: {
    'exception_type': 'GET_BANNER_LIST_FAILED',
    'message_zh-CN': '获取 Banner 列表失败',
    'message_en-US': 'Failed to get Banner list',
  },
  8003: {
    'exception_type': 'PUBLISH_BANNER_FAILED',
    'message_zh-CN': '发布 Banner 失败',
    'message_en-US': 'Failed to publish Banner',
  },
  8004: {
    'exception_type': 'DELETE_BANNER_FAILED',
    'message_zh-CN': '删除 Banner 失败',
    'message_en-US': 'Failed to delete Banner',
  },
  8005: {
    'exception_type': 'EDIT_BANNER_FAILED',
    'message_zh-CN': '编辑 Banner 失败',
    'message_en-US': 'Failed to edit Banner',
  },
  8006: {
    'exception_type': 'GET_DEFAULT_BANNER_PICTURE_FAILED',
    'message_zh-CN': '获取 Banner 默认图片失败',
    'message_en-US': 'Failed to get default Banner picture',
  },
  9001: {
    'exception_type': 'DESK_LIST_FAILED',
    'message_zh-CN': '获取工位状态失败',
    'message_en-US': 'Failed to get desk list',
  },
  9002: {
    'exception_type': 'DESK_COUNT_FAILED',
    'message_zh-CN': '获取工位数量失败',
    'message_en-US': 'Failed to get desk count',
  },
  9003: {
    'exception_type': 'DESK_TREND_FAILED',
    'message_zh-CN': '获取工位趋势失败',
    'message_en-US': 'Failed to get desk trend',
  },
  9004: {
    'exception_type': 'DESK_SERVICE_DURATION_FAILED',
    'message_zh-CN': '获取工位总服务时长失败',
    'message_en-US': 'Failed to get service duration',
  },
  9005: {
    'exception_type': 'DESK_DURATION_FAILED',
    'message_zh-CN': '获取工位时长失败',
    'message_en-US': 'Failed to get desk duration',
  },
  9006: {
    'exception_type': 'DESK_USAGE_RANK_FAILED',
    'message_zh-CN': '获取工位使用率排行失败',
    'message_en-US': 'Failed to get usage rank',
  },
  9007: {
    'exception_type': 'DESK_YESTERDAY_COUNT_FAILED',
    'message_zh-CN': '获取昨日使用工位数失败',
    'message_en-US': 'Failed to get yesterday desk count',
  },
  9008: {
    'exception_type': 'IOTAPI_GETTOKEN_FAILED',
    'message_zh-CN': '获取 IoT token 失败',
    'message_en-US': 'Failed to get IoT token',
  },
  9009: {
    'exception_type': 'GET_DEVICE_TWINS_FAILED',
    'message_zh-CN': '获取 Device Twins 信息失败',
    'message_en-US': 'Failed to get device twins information',
  },
  9010: {
    'exception_type': 'GET_LIFTING_TREND_FAILED',
    'message_zh-CN': '获取工位升降趋势信息失败',
    'message_en-US': 'Failed to get device lifting trend information',
  },
  9011: {
    'exception_type': 'GET_LIFTING_WEEK_FAILED',
    'message_zh-CN': '获取工位升降按周分布信息失败',
    'message_en-US': 'Failed to get device lifting information by week',
  },
  9012: {
    'exception_type': 'GET_LIFTING_HOUR_FAILED',
    'message_zh-CN': '获取工位升降按小时分布信息失败',
    'message_en-US': 'Failed to get device lifting information by hour',
  },
  9013: {
    'exception_type': 'GET_STANDING_RANK_FAILED',
    'message_zh-CN': '获取站立时长排行失败',
    'message_en-US': 'Failed to get stading time rank',
  },
  9014: {
    'exception_type': 'GET_LIFTING_RANK_FAILED',
    'message_zh-CN': '获取升降次数排行失败',
    'message_en-US': 'Failed to get lifting rank',
  },
  9015: {
    'exception_type': 'GET_LIFTING_STATISTICS_FAILED',
    'message_zh-CN': '获取升降统计信息失败',
    'message_en-US': 'Failed to get device lifting information',
  },
  10001: {
    'exception_type': 'LDAP_FAILED_TO_CREATE_USER_GROUP',
    'message_zh-CN': '创建用户组失败',
    'message_en-US': 'LDAP failed to user group',
  },
  10002: {
    'exception_type': 'LDAP_FAILED_TO_CREATE_DUPLICATE_USER',
    'message_zh-CN': '创建不能创建重复用户',
    'message_en-US': 'LDAP failed to duplicate user',
  },
  10003: {
    'exception_type': 'LDAP_FAILED_TO_CREATE_USER',
    'message_zh-CN': '创建用户失败',
    'message_en-US': 'LDAP failed to user',
  },
  10004: {
    'exception_type': 'LDAP_FAILED_TO_CREATE_PERMISSION_GROUP',
    'message_zh-CN': '创建权限组失败',
    'message_en-US': 'LDAP failed to create permission group',
  },
  10005: {
    'exception_type': 'LDAP_FAILED_TO_CREATE_COMPANY_GROUP',
    'message_zh-CN': '创建公司组失败',
    'message_en-US': 'LDAP failed to create company group',
  },
  10006: {
    'exception_type': 'LDAP_FAILED_TO_CREATE_DUPLICATE_COMPANY',
    'message_zh-CN': '不允许创建重复公司',
    'message_en-US': 'LDAP failed to create duplicate company',
  },
  10007: {
    'exception_type': 'LDAP_FAILED_TO_CREATE_COMPANY',
    'message_zh-CN': '创建公司失败',
    'message_en-US': 'LDAP failed to create company',
  },
  10008: {
    'exception_type': 'LDAP_FAILED_TO_CREATE_DUPLICATE_COMPANY_USER_GROUP',
    'message_zh-CN': '不允许创建重复公司人员组',
    'message_en-US': 'LDAP failed to create duplicate company user group',
  },
  10009: {
    'exception_type': 'LDAP_USER_NOT_EXIST',
    'message_zh-CN': '用户不存在',
    'message_en-US': 'LDAP user not exist',
  },
  100010: {
    'exception_type': 'LDAP_COMPANY_USER_GROUP_NOT_EXIST',
    'message_zh-CN': '公司用户组不存在',
    'message_en-US': 'LDAP company user group not exist',
  },
  10011: {
    'exception_type': 'LDAP_CREATE_COMPANY_USER_GROUP_FAILED',
    'message_zh-CN': '创建公司用户组失败',
    'message_en-US': 'LDAP failed to create company user group',
  },
  10012: {
    'exception_type': 'LDAP_COMPANY_USER_GROUP_ADD_USER_FAILED',
    'message_zh-CN': '公司用户组添加成员失败',
    'message_en-US': 'LDAP failed to add user to company user group',
  },
  10013: {
    'exception_type': 'LDAP_COMPANY_USER_GROUP_ADD_DUPLICATE_USER_FAILED',
    'message_zh-CN': '公司用户组不允许添加重复成员',
    'message_en-US': 'LDAP failed to add duplicate user to company user group',
  },
  10014: {
    'exception_type': 'LDAP_USER_NOT_IN_COMPANY',
    'message_zh-CN': '用户不在公司中',
    'message_en-US': 'LDAP user not in company',
  },
  10015: {
    'exception_type': 'LDAP_DELETE_USER_FROM_USER_GROUP_FAILED',
    'message_zh-CN': '用户从用户组删除失败',
    'message_en-US': 'LDAP failed to delete user form user group',
  },
  10016: {
    'exception_type': 'LDAP_PERMISSION_NOT_EXIST',
    'message_zh-CN': '指定权限不存在',
    'message_en-US': 'LDAP permission not exist',
  },
  10017: {
    'exception_type': 'LDAP_ADD_PERMISSION_TO_USER_FAILED',
    'message_zh-CN': '添加用户权限失败',
    'message_en-US': 'LDAP failed to add permission to user',
  },
  10018: {
    'exception_type': 'LDAP_DELETE_PERMISSION_OF_USER_FAILED',
    'message_zh-CN': '删除用户权限失败',
    'message_en-US': 'LDAP failed to  delete permission of user',
  },
  10019: {
    'exception_type': 'LDAP_USER_HAS_NO_PERMISSION',
    'message_zh-CN': '用户没有指定权限',
    'message_en-US': 'LDAP user has no permission',
  },
  10020: {
    'exception_type': 'LDAP_CREATE_OWNER_PERMISSION_FAILED',
    'message_zh-CN': '用户没有指定权限',
    'message_en-US': 'LDAP create owner permission failed',
  },
  10021: {
    'exception_type': 'LDAP_ADD_PERMISSION_TO_USER_GROUP_FAILED',
    'message_zh-CN': '添加用户组权限失败',
    'message_en-US': 'LDAP add permission to user group',
  },
  10022: {
    'exception_type': 'LDAP_DELETE_PERMISSION_OF_USER_GROUP_FAILED',
    'message_zh-CN': '删除用户组权限失败',
    'message_en-US': 'LDAP failed to delete permission of user group',
  },
  10023: {
    'exception_type': 'LDAP_USER_GROUP_HAS_NO_SPECIFIC_PERMISSION_TO_DELETE',
    'message_zh-CN': '用户组没有指定权限',
    'message_en-US': 'LDAP user group has no specific permission to delete',
  },
  10024: {
    'exception_type': 'LDAP_RESOURCE_NOT_EXIST',
    'message_zh-CN': '资源不存在',
    'message_en-US': 'LDAP resource doesn\'t exist',
  },
  10025: {
    'exception_type': 'LDAP_GROUP_NOT_EXIST',
    'message_zh-CN': ' 组不存在',
    'message_en-US': 'LDAP group doesn\'t exist',
  },
  11001: {
    'exception_type': 'ADD_GATEWAY_FAILED',
    'message_zh-CN': '添加网关失败',
    'message_en-US': 'Failed to add gateway',
  },
  11002: {
    'exception_type': 'REGISTER_DEVICE_FAILED',
    'message_zh-CN': '注册 Device 失败',
    'message_en-US': 'Failed to register device',
  },
  11003: {
    'exception_type': 'SET_REGISTERER_FAILED',
    'message_zh-CN': '设置注册者失败',
    'message_en-US': 'Failed to set registerer',
  },
  12001: {
    'exception_type': 'FAILED_TO_RESET_SHARE',
    'message_zh-CN': '重置分享失败',
    'message_en-US': 'Failed to reset share',
  },
  12002: {
    'exception_type': 'FAILED_TO_OPEN_SHARE',
    'message_zh-CN': '打开/关闭分享失败',
    'message_en-US': 'Failed to open/close share',
  },
  12003: {
    'exception_type': 'FAILED_TO_GET_SHARE',
    'message_zh-CN': '获取分享失败',
    'message_en-US': 'Failed to get share',
  },
  13001: {
    'exception_type': 'GET_SENSOR_LIST_FAILED',
    'message_zh-CN': '获取传感器列表失败',
    'message_en-US': 'Failed to get sensor list',
  },
  13002: {
    'exception_type': 'UPDATE_SENSOR_REMARK_FAILED',
    'message_zh-CN': '修改传感器备注失败',
    'message_en-US': 'Failed to update sensor remark',
  },
  14001: {
    'exception_type': 'GET_RESOURCE_LIST_FAILED',
    'message_zh-CN': '获取点位列表失败',
    'message_en-US': 'Failed to get resource list',
  },
  14002: {
    'exception_type': 'UPDATE_RESOURCE_FAILED',
    'message_zh-CN': '修改点位信息失败',
    'message_en-US': 'Failed to update resource',
  },
  14003: {
    'exception_type': 'GET_RESOURCE_STATUS_FAILED',
    'message_zh-CN': '获取点位实时状态失败',
    'message_en-US': 'Failed to get resource status',
  },
  14004: {
    'exception_type': 'GET_RESOURCE_DATA_LIST_FAILED',
    'message_zh-CN': '获取点位数据列表失败',
    'message_en-US': 'Failed to get resource data list',
  },
  14005: {
    'exception_type': 'GET_RESOURCE_STATUS_IN_TIME_FRAME_FAILED',
    'message_zh-CN': '获取点位一段时间内的全部状态失败',
    'message_en-US': 'Failed to get resource status in a time frame',
  },
  14006: {
    'exception_type': 'UPDATE_RESOURCE_MARK_FAILED',
    'message_zh-CN': '修改点位数据标注失败',
    'message_en-US': 'Failed to update resource mark',
  },
  14007: {
    'exception_type': 'CREATE_TAG_FAILED',
    'message_zh-CN': '新建标签失败',
    'message_en-US': 'Failed to create tag',
  },
  14008: {
    'exception_type': 'UPDATE_RESOURCE_TAG_FAILED',
    'message_zh-CN': '添加/删除点位标签失败',
    'message_en-US': 'Failed to update resource tag',
  },
  14009: {
    'exception_type': 'DELETE_TAG_FAILED',
    'message_zh-CN': '删除标签失败',
    'message_en-US': 'Failed to delete tag',
  },
  14010: {
    'exception_type': 'GET_TAG_LIST_FAILED',
    'message_zh-CN': '获取公司所有标签失败',
    'message_en-US': 'Failed to get tag list',
  },
  14011: {
    'exception_type': 'ADD_RESOURCE_FAILED',
    'message_zh-CN': '添加点位失败',
    'message_en-US': 'Failed to add resource',
  },
  14012: {
    'exception_type': 'ADD_OR_UPDATE_RESOURCE_FAILED_INVALID_SENSOR_IDS',
    'message_zh-CN': '添加或编辑点位失败，传感器 ID 不正确',
    'message_en-US': 'Failed to add or update resource, invalid sensor ids',
  },
  14013: {
    'exception_type': 'GET_RESOURCE_STATUS_LIST_FAILED',
    'message_zh-CN': '获取点位健康数据失败',
    'message_en-US': 'Failed to get resource health data',
  },
  14014: {
    'exception_type': 'IMPORT_RESOURCE_FAILED',
    'message_zh-CN': '导入点位数据失败',
    'message_en-US': 'Import resource faild',
  },
  14015: {
    'exception_type': 'UPDATE_SENSOR_DIRECTION_OF_RESOURCE_FAILED',
    'message_zh-CN': '更新点位传感器方向失败',
    'message_en-US': 'Failed to update sensor direction',
  },
  15001: {
    'exception_type': 'GET_STATISTICS_OVERVIEW_FAILED',
    'message_zh-CN': '获取统计概览数据失败',
    'message_en-US': 'Failed to get statistics overview data',
  },
  16001: {
    'exception_type': 'GET_MEETING_ROOM_STATISTICS_FAILED',
    'message_zh-CN': '获取会议室分析统计数据失败',
    'message_en-US': 'Failed to get meeting room statistics data',
  },
  16002: {
    'exception_type': 'GET_MEETING_ROOM_CHANGE_DATA_FAILED',
    'message_zh-CN': '获取会议室分析使用数变化数据失败',
    'message_en-US': 'Failed to get meeting room use number change data',
  },
  16003: {
    'exception_type': 'GET_MEETING_ROOM_USAGE_RATE_FAILED',
    'message_zh-CN': '获取会议室分析使用率对比数据失败',
    'message_en-US': 'Failed to get meeting room usage rate data',
  },
  16004: {
    'exception_type': 'GET_MEETING_ROOM_USAGE_NUMBER_FAILED',
    'message_zh-CN': '获取会议室分析使用率分布数据失败',
    'message_en-US': 'Failed to get meeting room usage distribution data',
  },
  16005: {
    'exception_type': 'GET_MEETING_ROOM_USE_DAYS_RANK_FAILED',
    'message_zh-CN': '获取会议室分析使用天数排行榜数据失败',
    'message_en-US': 'Failed to get meeting room use days rank data',
  },
  16006: {
    'exception_type': 'GET_MEETING_ROOM_USE_DURATION_RANK_FAILED',
    'message_zh-CN': '获取会议室分析使用时长排行榜数据失败',
    'message_en-US': 'Failed to get meeting room use duration rank data',
  },
  16007: {
    'exception_type': 'GET_MEETING_ROOM_DAILY_USAGE_RATE_FAILED',
    'message_zh-CN': '获取会议室分析每日使用率数据失败',
    'message_en-US': 'Failed to get meeting room daily usage rate data',
  },
  16008: {
    'exception_type': 'EXPORT_MEETING_ROOM_DATA_FAILED',
    'message_zh-CN': '导出会议室数据失败',
    'message_en-US': 'Failed to export meeting room data',
  },
  16009: {
    'exception_type': 'GET_MEETING_ROOM_USAGE_IN_WEEK_FAILED',
    'message_zh-CN': '获取会议室分析周分布数据失败',
    'message_en-US': 'Failed to get meeting room usage in week data',
  },
  16010: {
    'exception_type': 'GET_MEETING_ROOM_USAGE_IN_DAY_FAILED',
    'message_zh-CN': '获取会议室分析一日内时间分布数据失败',
    'message_en-US': 'Failed to get meeting room usage in day data',
  },
  17001: {
    'exception_type': 'GET_STATION_STATISTICS_FAILED',
    'message_zh-CN': '获取工位分析统计数据失败',
    'message_en-US': 'Failed to get desk statistics data',
  },
  17002: {
    'exception_type': 'GET_STATION_TREND_FAILED',
    'message_zh-CN': '获取工位分析每日占用趋势数据失败',
    'message_en-US': 'Failed to get desk usage trend data',
  },
  17003: {
    'exception_type': 'GET_STATION_USAGE_RATE_DISTRIBUTION_FAILED',
    'message_zh-CN': '获取工位分析使用率分布数据失败',
    'message_en-US': 'Failed to get desk usage rate distribution data',
  },
  17004: {
    'exception_type': 'GET_STATION_USAGE_IN_WEEK_FAILED',
    'message_zh-CN': '获取工位分析周分布数据失败',
    'message_en-US': 'Failed to get desk usage in week data',
  },
  17005: {
    'exception_type': 'GET_STATION_USAGE_IN_DAY_FAILED',
    'message_zh-CN': '获取工位分析一日内时间分布数据失败',
    'message_en-US': 'Failed to get desk usage in day data',
  },
  17006: {
    'exception_type': 'GET_STATION_VACANCY_DAYS_DISTRIBUTION_FAILED',
    'message_zh-CN': '获取工位分析空闲工位分布失败',
    'message_en-US': 'Failed to get desk vacancy days distribution data',
  },
  17007: {
    'exception_type': 'GET_STATION_VACANCY_DAYS_RANK_FAILED',
    'message_zh-CN': '获取工位分析空闲工位排行失败',
    'message_en-US': 'Failed to get desk vacancy days rank data',
  },
  17008: {
    'exception_type': 'GET_STATION_USE_DURATION_RANK_FAILED',
    'message_zh-CN': '获取工位分析工位使用率排行失败',
    'message_en-US': 'Failed to get desk use duration rank data',
  },
  17009: {
    'exception_type': 'EXPORT_STATION_DATA_FAILED',
    'message_zh-CN': '导出工位数据失败',
    'message_en-US': 'Failed to export desk data',
  },
  18001: {
    'exception_type': 'GET_WECHAT_SIGNATURE_FAILED',
    'message_zh-CN': '获取微信签名失败',
    'message_en-US': 'Failed to get wechat signature',
  },
  18002: {
    'exception_type': 'GET_WECHAT_LOGIN_TOKEN_FAILED',
    'message_zh-CN': '获取微信登录token失败',
    'message_en-US': 'Failed to get wechat login token',
  },
  18003: {
    'exception_type': 'REGISTER_WECHAT_OPENID_FAILED',
    'message_zh-CN': '注册微信openid失败',
    'message_en-US': 'Failed to register wechat openid',
  },
  18004: {
    'exception_type': 'GET_WECHAT_ACCESS_TOKEN_FAILED',
    'message_zh-CN': '获取微信Access_token失败',
    'message_en-US': 'Failed to get wechat access token',
  },
  18005: {
    'exception_type': 'BIND_OR_UNBIND_RESOURCE_WITH_WECHAT_FAILED',
    'message_zh-CN': '微信绑定/解绑点位失败',
    'message_en-US': 'Failed to bind or unbind resource with wechat',
  },
  18006: {
    'exception_type': 'RECORD_HEALTH_REPORT_VIEW_TIMES_FAILED',
    'message_zh-CN': '记录健康报告的查看次数失败',
    'message_en-US': 'Failed to record health report view times',
  },
  18007: {
    'exception_type': 'MINI_PROGRAM_LOGIN_FAILED',
    'message_zh-CN': '小程序登录失败',
    'message_en-US': 'Failed to login mini program',
  },
  18008: {
    'exception_type': 'DECRYPT_MINI_PROGRAM_USER_DATA_FAILED',
    'message_zh-CN': '解密小程序用户信息数据失败',
    'message_en-US': 'Failed to decrypt mini program user data',
  },
  18009: {
    'exception_type': 'MINI_PROGRAM_REGISTER_FAILED',
    'message_zh-CN': '小程序注册失败',
    'message_en-US': 'Failed to register mini program',
  },
  19001: {
    'exception_type': 'GET_SENSOR_STATISTICS_FAILED',
    'message_zh-CN': '获取传感器统计概览数据失败',
    'message_en-US': 'Failed to get sensor statistics data',
  },
  19002: {
    'exception_type': 'GET_SENSOR_TREND_FAILED',
    'message_zh-CN': '获取传感器离线与恢复趋势数据失败',
    'message_en-US': 'Failed to get sensor offline trend data',
  },
  19003: {
    'exception_type': 'GET_SENSOR_OFFLINE_DAYS_DISTRIBUTION_FAILED',
    'message_zh-CN': '获取传感器离线天数分布失败',
    'message_en-US': 'Failed to get sensor offline days distribution data',
  },
  19004: {
    'exception_type': 'GET_SENSOR_OFFLINE_DAYS_RANK_FAILED',
    'message_zh-CN': '获取传感器离线天数排行失败',
    'message_en-US': 'Failed to get sensor offline days rank data',
  },
  19005: {
    'exception_type': 'GET_SENSOR_OFFLINE_DURATION_RANK_FAILED',
    'message_zh-CN': '获取传感器离线时长排行失败',
    'message_en-US': 'Failed to get sensor offline duration rank data',
  },
  19006: {
    'exception_type': 'ADD_SENSOR_FAILED',
    'message_zh-CN': '添加传感器失败',
    'message_en-US': 'Failed to add sensor',
  },
  19007: {
    'exception_type': 'IMPORT_SENSOR_FAILED',
    'message_zh-CN': '导入传感器失败',
    'message_en-US': 'Failed to import sensors',
  },
  20001: {
    'exception_type': 'GET_DASHBOARD_DATA_FAILED',
    'message_zh-CN': '获取Dashboard统计数据失败',
    'message_en-US': 'Failed to get dashboard statistics data',
  },
  21001: {
    'exception_type': 'GET_MAP_LIST_FAILED',
    'message_zh-CN': '获取svg图列表失败',
    'message_en-US': 'Failed to get svg map list',
  },
  21002: {
    'exception_type': 'GET_HTAT_MAP_RESOURCE_FAILED',
    'message_zh-CN': '获取热力图的点位数据失败',
    'message_en-US': 'Failed to get resource data of heat map',
  },
  21003: {
    'exception_type': 'GET_MAP_SVG_FAILED',
    'message_zh-CN': '获取svg图失败',
    'message_en-US': 'Failed to get map SVG',
  },
  22001: {
    'exception_type': 'CUSTOMIZE_THE_WECHAT_MENU_FAILED',
    'message_zh-CN': '自定义微信公众号菜单失败',
    'message_en-US': 'Failed to customize wechat menu',
  },
  // 空间分析开放API错误码(点位相关)
  23001: {
    'exception_type': 'INVALID_SPOT_ID',
    'message_zh-CN': '点位id无效',
    'message_en-US': 'Invalid spot id',
  },
  23002: {
    'exception_type': 'INVALID_TIME',
    'message_zh-CN': '请求时间段超出限制',
    'message_en-US': 'Time out of limit',
  },
  23003: {
    'exception_type': 'INVALID_SENSOR_DATA',
    'message_zh-CN': '传感器数据错误',
    'message_en-US': 'Invalid sensor data',
  },
  23004: {
    'exception_type': 'SENSOR_DATA_INVALID',
    'message_zh-CN': '新建点位,传感器数据错误',
    'message_en-US': 'New spot, sensor data invalid',
  },
  23005: {
    'exception_type': 'COUNT_INVALID',
    'message_zh-CN': '新建点位,count不合法',
    'message_en-US': 'New spot, count invalid',
  },
  // OpenAPI数据库相关
  24001: {
    'exception_type': 'OPERATION_DB_FAILED',
    'message_zh-CN': '执行数据库操作错误',
    'message_en-US': 'Error performing database operation',
  },
  // OpenAPI权限相关(设置)
  25001: {
    'exception_type': 'GET_TOKEN_FAILED',
    'message_zh-CN': '开放API获取Token错误',
    'message_en-US': 'Error get token error',
  },
  25002: {
    'exception_type': 'SET_RECEIVE_INTERFACE_FAILED',
    'message_zh-CN': '设置点位事件推送接口失败',
    'message_en-US': 'Failed to set spotEvent push interface',
  },
  25003: {
    'exception_type': 'URL_INVALID',
    'message_zh-CN': 'URL不合法',
    'message_en-US': 'Url is invalid',
  },
  25004: {
    'exception_type': 'BEYOUND_DAILY_LIMIT',
    'message_zh-CN': '请求超出每日限额',
    'message_en-US': 'beyound daily limit',
  },
  25005: {
    'exception_type': 'BEYOUND_MONTHLY_LIMIT',
    'message_zh-CN': '请求超出每月限额',
    'message_en-US': 'beyound monthly limit',
  },
  25006: {
    'exception_type': 'GET_OPENAPI_LIST_FAILED',
    'message_zh-CN': '获取空间分析开放API列表失败',
    'message_en-US': 'get OpenApi list failed',
  },
  25007: {
    'exception_type': 'API_NOT_EXIST',
    'message_zh-CN': '接口不存在或已删除',
    'message_en-US': 'api not exist',
  },
  25008: {
    'exception_type': 'ACCOUNT_INVALID',
    'message_zh-CN': '账号不合法',
    'message_en-US': 'account is invalid',
  },
  25009: {
    'exception_type': 'INTERFACE_DOES_NOT_EXIST',
    'message_zh-CN': '接口不存在',
    'message_en-US': 'Interface does not exist',
  },
  25010: {
    'exception_type': 'IP_ADDRESS_HAS_NO_PERMISSION',
    'message_zh-CN': 'IP地址无权限',
    'message_en-US': 'IP address has no permissions',
  },
  25011: {
    'exception_type': 'IP_ADDRESS_IS_INVALID',
    'message_zh-CN': 'IP地址不合法',
    'message_en-US': 'IP address is not valid',
  }
};

const serverMessages = {
  ERROR_COMPANY_NAME: {
    'key': 'ERROR_COMPANY_NAME',
    'message_zh-CN': '企业名称未填写或企业不存在',
    'message_en-US': 'Invalid enterprise abbreviation'
  },
  EXCESSIVE_RESOURCES: {
    'key': 'EXCESSIVE_RESOURCES',
    'message_zh-CN': '最多可添加500个点位',
    'message_en-US': 'Up to 500 points can be added'
  },
  ERROR_SENSOR_ID: {
    'key': 'ERROR_SENSOR_ID',
    'message_zh-CN': '传感器不存在',
    'message_en-US': 'Invalid sensor id'
  },
  DUPLICATE_SENSOR_ID: {
    'key': 'DUPLICATE_SENSOR_ID',
    'message_zh-CN': '传感器 ID 重复',
    'message_en-US': 'Duplicate sensor id'
  },
  EXCESSIVE_SENSOR_ID: {
    'key': 'EXCESSIVE_SENSOR_ID',
    'message_zh-CN': '最多可添加100条传感器编号',
    'message_en-US': 'Up to 100 sensors can be added'
  },
  ERROR_LOCATION_TYPE: {
    'key': 'ERROR_LOCATION_TYPE',
    'message_zh-CN': '您当前有未填写的点位类型，请填写完成后从新上传',
    'message_en-US': 'You currently have an unfilled type of point, please fill out the new upload'
  },
  ERROR_STATISTICAL_SWITCH: {
    'key': 'ERROR_STATISTICAL_SWITCH',
    'message_zh-CN': '统计开关只能输入“Y”和“N”，请确认后重新上传',
    'message_en-US': 'Statistical switch can only enter "Y" and "N", please confirm and re-upload'
  },
  ERROR_PARAM: {
    'key': 'ERROR_PARAM',
    'message_zh-CN': '参数值包含非法字符或未填写，请确认后重新上传',
    'message_en-US': 'The parameter contains illegal characters or is not filled in. Please confirm and re-upload'
  },
  INVALID_SENSOR_ID_LENGTH: {
    'key': 'INVALID_SENSOR_ID_LENGTH',
    'message_zh-CN': '传感器id不符合上传长度',
    'message_en-US': 'Invalid sensor ID length.'
  },
  EXCEL_DUPLICATE_SENSOR_ID: {
    'key': 'EXCEL_DUPLICATE_SENSOR_ID',
    'message_zh-CN': '表格中存在两条相同传感器id',
    'message_en-US': 'Duplicate sensor IDs are not allowed.'
  },
  SENSOR_ID_ALREADY_EXISTS: {
    'key': 'SENSOR_ID_ALREADY_EXISTS',
    'message_zh-CN': '传感器id已存在',
    'message_en-US': 'Sensor ID already exists'
  },
  EXCESSIVE_SENSORS: {
    'key': 'EXCESSIVE_SENSORS',
    'message_zh-CN': '最多可添加500条传感器编号',
    'message_en-US': 'Up to 500 sensors can be added'
  },
  INVALID_SENSOR_TYPE: {
    'key': 'INVALID_SENSOR_TYPE',
    'message_zh-CN': '传感器类型格式不正确',
    'message_en-US': 'Invalid sensor type'
  },
  INVALID_SENSOR_TAG: {
    'key': 'INVALID_SENSOR_TAG',
    'message_zh-CN': '传感器编号格式不正确',
    'message_en-US': 'Invalid sensor tag'
  },
  DUPLICATE_SENSOR_TAG: {
    'key': 'DUPLICATE_SENSOR_TAG',
    'message_zh-CN': '表格中存在两条相同传感器编号',
    'message_en-US': 'Duplicate sensor tag are not allowed.'
  },
  SENSOR_TAG_ALREADY_EXISTS: {
    'key': 'SENSOR_TAG_ALREADY_EXISTS',
    'message_zh-CN': '传感器编号已存在',
    'message_en-US': 'Sensor tag already exists'
  },
  INVALID_ACCESS_KEY: {
    'key': 'INVALID_ACCESS_KEY',
    'message_zh-CN': 'IoT Hub访问密钥格式不存在(注意:只允许上传英文的\',\')',
    'message_en-US': 'Invalid IoT Hub device access key.'
  },
  INCONSISTENT_ACCESS_KEY: {
    'key': 'INCONSISTENT_ACCESS_KEY',
    'message_zh-CN': '传感器id已存在,但IoT Hub密钥不匹配',
    'message_en-US': 'Sensor id already exists, but IoT Hub access key does not match',
  },
  INVALID_SENSOR_DIRECTION: {
    'key': 'INVALID_SENSOR_DIRECTION',
    'message_zh-CN': '传感器方向非-1, 0或1',
    'message_en-US': 'Sensor direction is not one of -1, 0, 1 ',
  },
  MISMATCHED_SENSOR_DIRECTION_COUNT: {
    'key': 'INVALID_SENSOR_DIRECTION_COUNT',
    'message_zh-CN': '传感器方向个数与传感器编号个数不匹配',
    'message_en-US': 'Sensor direction count is mismatch with Sensor id count',
  }
};

module.exports = { errorList, serverMessages };