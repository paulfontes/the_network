export class Account {
  /**
   * @typedef AccountData
   * @property {string} id
   * @property {string} email
   * @property {string} name
   * @property {string} picture
   * 
   * @param {Object} data
   * @param {string} data.bio
   * @param {string} data.coverImg
   * @param {number} data.createdAt
   * @param {string} data.email
   * @param {string} data.github
   * @param {string} data.graduated
   * @param {number} data.id
   * @param {string} data.linkedin
   * @param {string} data.name
   * @param {string} data.picture
   * @param {string} data.resume
   * @param {number} data.updatedAt
   * 
   * 
   */
  constructor({ bio, coverImg, createdAt, email, github, graduated, id, linkedin, name, picture, resume, updatedAt }) {


    this.bio = bio
    // this.class = class;
    this.coverImg = coverImg;
    this.createdAt = new Date(createdAt).toLocaleDateString;
    this.email = email;
    this.github = github;
    this.graduated = graduated;
    this.id = id;
    this.linkedin = linkedin;
    this.name = name;
    this.picture = picture;
    this.resume = resume;
    this.updatedAt = new Date(updatedAt).toLocaleDateString;
    // TODO add additional properties if needed

  }
}
