export default {
 
  methods: {
    handleRemove() {
      console.log('删除');
      this.img_no = 0;
    },
    handlePictureCardPreview(file) {
      console.log(
        '预览'
      );
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response) {
      console.log('添加');
      this.img_no = response.data
    }
  },
}
