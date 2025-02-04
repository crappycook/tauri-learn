// 基础文件信息接口
export interface FileItemData {
  name: string;
  path: string;
  is_dir: boolean;
  is_hidden: boolean;
  created: number;
}

// 组件 Props 接口继承基础接口，并添加额外属性
export interface FileItemProps extends FileItemData {
  onNavigate: (path: string) => void;
}
