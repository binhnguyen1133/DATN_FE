import React from "react";
import "./about.scoped.css";

export class About extends React.Component {
  render() {
    return (
      <div className="about">
        <div class="bg-light">
          <div class="container py-5">
            <div class="row h-100 align-items-center py-5">
              <div class="col-lg-6">
                <h1 class="display-4 about-heading">ABOUT MY TEAM</h1>
                <p class="lead text-muted mb-0 project-name">
                  Đồ Án Tìm Kiếm Việc Làm Thông Minh
                </p>
              </div>
              <div class="col-lg-6 d-none d-lg-block">
                <img
                  src="https://lh3.googleusercontent.com/proxy/2_IECfP2vkZFH7jeNZRLreg-jORYCLflr0Vrvz_maTcoPlt3RA_DBtknEwJgFRq50DtXOwmFJlZ2BaIDyHUL_JdvYe-8u_xBd5Tj-dvk"
                  alt=""
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-light py-5">
          <div class="container py-5">
            <div class="row mb-4">
              <div class="col-lg-5">
                <h2 class="display-4 font-weight-light">Our team</h2>
                <p class="font-italic text-muted">
                  There are 6 members in my team.
                </p>
              </div>
            </div>

            <div class="row text-center">
              <div class="col-xl-4 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img
                    src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.6435-9/83261440_1421842167989858_4963501628754755584_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=174925&_nc_ohc=oGRCBPa-wGsAX-nojpy&_nc_ht=scontent.fvca1-1.fna&oh=5669dafaa5ff5225d3aeefbb5671d57f&oe=60C989C9"
                    alt=""
                    width="100"
                    class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 class="mb-0">Võ Đức Dân</h5>
                  <span class="small text-uppercase text-muted">BE DEV</span>
                  <span class="small text-uppercase text-muted">
                    MSSV: 1712317
                  </span>
                  <ul class="social mb-0 list-inline mt-3">
                    <li class="list-inline-item">
                      <a
                        href="https://www.facebook.com/130199ddv" 
                        target="_blank"
                        class="social-link"
                      >
                        <i class="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a 
                        href="https://github.com/voducdan" 
                        target="_blank"
                        class="social-link"
                      >
                        <i class="fab fa-git-alt" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-xl-4 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img
                    src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.15752-9/199149801_548749249841880_5949414187981924781_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=ae9488&_nc_ohc=GvqtEK-8qnIAX_jpJD0&_nc_ht=scontent.fvca1-1.fna&oh=07bcd48e5e40ef043a6ab4b12e47f937&oe=60CA3969"
                    alt=""
                    width="100"
                    class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 class="mb-0">Thạch Minh Trí</h5>
                  <span class="small text-uppercase text-muted">BE DEV</span>
                  <span class="small text-uppercase text-muted">
                    MSSV: 1712253
                  </span>
                  <ul class="social mb-0 list-inline mt-3">
                    <li class="list-inline-item">
                      <a
                        href="https://www.facebook.com/minhtri.thach.2" 
                        target="_blank"
                        class="social-link"
                      >
                        <i class="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="https://github.com/minhtrithach" 
                        target="_blank"
                        class="social-link"
                      >
                        <i class="fab fa-git-alt" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-xl-4 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img
                    src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.15752-9/199282955_227421555858528_2953803408459500333_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=ae9488&_nc_ohc=1ECrzgD5mosAX_iKntG&_nc_ht=scontent.fvca1-1.fna&oh=476bd00e106b8913511f14c57f7ed0f1&oe=60C9437D"
                    alt=""
                    width="100"
                    class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 class="mb-0">Nguyễn Quang Bình</h5>
                  <span class="small text-uppercase text-muted">FE DEV</span>
                  <span class="small text-uppercase text-muted">
                    MSSV: 1712294
                  </span>
                  <ul class="social mb-0 list-inline mt-3">
                    <li class="list-inline-item">
                      <a
                        href="https://www.facebook.com/nguyenquang.binh.718/" 
                        target="_blank"
                        class="social-link"
                      >
                        <i class="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="https://github.com/binhnguyen1133" 
                        target="_blank"
                        class="social-link"
                      >
                        <i class="fab fa-git-alt" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-xl-4 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img
                    src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.6435-9/149794765_1548925385298888_4506960114216503913_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=IARrHkUfdJIAX9CPgV8&_nc_ht=scontent.fvca1-1.fna&oh=58c38cc61519fdcc2684f2b4c5e401f8&oe=60CA60A0"
                    alt=""
                    width="100"
                    class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 class="mb-0">Nguyễn Trương Anh Tuấn</h5>
                  <span class="small text-uppercase text-muted">BE DEV</span>
                  <span class="small text-uppercase text-muted">
                    MSSV: 1712197
                  </span>
                  <ul class="social mb-0 list-inline mt-3">
                    <li class="list-inline-item">
                      <a
                        href="https://www.facebook.com/profile.php?id=100005443237924" 
                        target="_blank"
                        class="social-link"
                      >
                        <i class="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="https://github.com/ngtranhtuan99" target="_blank"
                        class="social-link"
                      >
                        <i class="fab fa-git-alt" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-xl-4 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img
                    src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.6435-9/120062334_3140262699436012_3564214711077859378_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=6AlBOM5CPv4AX8kdte2&_nc_ht=scontent.fvca1-1.fna&oh=b402e901cd683b3651dc9c39893175f2&oe=60C9588D"
                    alt=""
                    width="100"
                    class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 class="mb-0">Trương Thành Danh</h5>
                  <span class="small text-uppercase text-muted">FE DEV</span>
                  <span class="small text-uppercase text-muted">
                    MSSV: 1712319 
                  </span>
                  <ul class="social mb-0 list-inline mt-3">
                    <li class="list-inline-item">
                      <a
                        href="https://www.facebook.com/thanhdanh2802"
                        class="social-link"
                      >
                        <i class="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a 
                        href="https://github.com/ttdanh282" 
                        target="_blank"
                        class="social-link"
                      >
                        <i class="fab fa-git-alt" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-xl-4 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img
                    src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.6435-9/131424573_106726391325156_1128468971805127970_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uv72FM23lYYAX_r7vAZ&_nc_ht=scontent.fvca1-1.fna&oh=200565a23ea48d1b23919034205af14e&oe=60C92695"
                    alt=""
                    width="100"
                    class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 class="mb-0">Vũ Văn Đạt</h5>
                  <span class="small text-uppercase text-muted">TESTER</span>
                  <span class="small text-uppercase text-muted">
                    MSSV: 1712339 
                  </span>
                  <ul class="social mb-0 list-inline mt-3">
                    <li class="list-inline-item">
                      <a
                        href="https://www.facebook.com/datvustar"
                        target="_blank"
                        class="social-link"
                      >
                        <i class="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a 
                        href="https://github.com/MichaelD9910" 
                        target="_blank"
                        class="social-link"
                      >
                        <i class="fab fa-git-alt" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
