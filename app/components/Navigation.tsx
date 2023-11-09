import { cookies } from 'next/headers';
import Link from 'next/link';
import SignOutButton from '../(auth)/signOut/signOutFormComponent';
import { getUserBySessionToken } from '../../database/users';
import { navigation } from '../../util/pageNavigation';

export default async function Navigation() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const pageIndex = navigation;

  const currentUser =
    sessionToken && (await getUserBySessionToken(sessionToken.value));
  console.log(currentUser);

  const pageIndexUser =
    currentUser && currentUser.userRolesId && currentUser.userRolesId.length > 0
      ? navigation.map((n) => {
          n.permissionFor.includes(currentUser.userRolesId[0].name);
          return n;
        })
      : pageIndex;

  return (
    <div className="absolute inset-x-0 top-0 z-50">
      <div className="navbar bg-base-100 bg-transparent">
        <div className="navbar-start ml-4">
          {!currentUser ? (
            ''
          ) : (
            <div className="dropdown">
              <button className="btn max-w-xs	-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h1 6M4 12h8m-8 6h1 6"
                  />
                </svg>
              </button>
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {pageIndexUser.map((p) => {
                  return (
                    <li key={`id-${p.pageName}`}>
                      <a className="link-custom-nav" href={p.href}>
                        {p.pageName}
                      </a>
                    </li>
                  );
                })}
                <li>
                  <a className="link-custom-nav" href="/personaldata">
                    Profile Page
                  </a>
                </li>
                <li>
                  <a className="link-custom-nav">Dashboard</a>
                  <ul className="p-2">
                    <li>
                      <a className="link-custom-nav" href="/dashboard/mentors">
                        Dashboard Mentor
                      </a>
                    </li>
                    <li>
                      <a className="link-custom-nav" href="/dashboard/mentees">
                        Dashboard Mentee
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="link-custom-nav">Matching Info Input</a>
                  <ul className="p-2">
                    <li>
                      <a
                        className="link-custom-nav"
                        href="/matchingdata/mentors"
                      >
                        Matching Data Mentor
                      </a>
                    </li>
                    <li>
                      <a
                        className="link-custom-nav"
                        href="/matchingdata/mentees"
                      >
                        Matching Data Mentee
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="link-custom-nav">Matching Overview</a>
                  <ul className="p-2">
                    <li>
                      <a
                        className="link-custom-nav"
                        href="/matchingoverview/mentors"
                      >
                        Matching Overview Mentor
                      </a>
                    </li>
                    <li>
                      <a
                        className="link-custom-nav"
                        href="/matchingoverview/mentees"
                      >
                        Matching Overview Mentee
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
          <Link href="/#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              width="100%"
              viewBox="0 0 433 80"
              enableBackground="new 0 0 433 80"
            >
              <path
                fill="#F7A932"
                opacity="1.000000"
                stroke="none"
                d=" M76.399994,81.000000   C68.672127,73.572227 61.343498,66.145210 54.017345,58.715740   C53.086769,57.772041 51.732605,56.961132 51.354927,55.828529   C50.871944,54.380131 51.181091,52.667591 51.148869,51.068882   C52.634815,51.097084 54.726692,50.494606 55.513489,51.250519   C63.877186,59.285919 72.096298,67.476624 80.145325,75.826904   C80.907799,76.617912 80.245934,78.781883 80.122665,80.654221   C78.933327,81.000000 77.866661,81.000000 76.399994,81.000000  z"
              />
              <path
                fill="#3A4047"
                opacity="1.000000"
                stroke="none"
                d=" M434.000000,50.562500   C427.783478,55.757988 423.670776,55.966389 415.241547,50.949303   C417.906982,50.151157 419.388245,49.424137 420.904419,49.341961   C422.150635,49.274418 423.524353,50.434353 424.686584,50.217945   C426.242462,49.928242 427.648804,48.835258 429.119354,48.087196   C428.083862,47.035580 427.195770,45.739872 425.971649,45.000580   C424.732056,44.251965 422.788055,44.448586 421.813171,43.530067   C419.927704,41.753719 417.083160,39.353878 417.257874,37.453484   C417.469696,35.149570 420.040039,31.848850 422.229034,31.226078   C425.476257,30.302248 429.284943,31.352020 432.854645,31.561678   C432.928314,32.485287 433.001953,33.408897 433.075623,34.332504   C431.470459,34.618458 429.874481,35.002674 428.256714,35.153458   C427.288361,35.243706 426.155518,34.624935 425.329498,34.938450   C424.089172,35.409195 423.053284,36.418434 421.930481,37.198715   C422.780548,38.072182 423.485809,39.211807 424.508392,39.768257   C427.363220,41.321674 430.349457,42.633560 433.641907,44.020401   C434.000000,46.041668 434.000000,48.083332 434.000000,50.562500  z"
              />
              <path
                fill="#EA5526"
                opacity="1.000000"
                stroke="none"
                d=" M38.583336,1.000000   C39.207710,3.725599 39.750668,6.488053 39.457088,9.158543   C39.340687,10.217407 37.325024,11.861199 36.250832,11.803744   C35.116398,11.743066 33.271576,10.053251 33.157860,8.931141   C32.922863,6.612157 33.631210,4.197577 33.975773,1.411159   C35.388889,1.000000 36.777779,1.000000 38.583336,1.000000  z"
              />
              <path
                fill="#4D8FCB"
                opacity="1.000000"
                stroke="none"
                d=" M1.000000,34.416668   C3.572864,33.708771 6.178226,33.058147 8.704100,33.286560   C9.867645,33.391777 11.688624,35.187778 11.728389,36.271545   C11.769205,37.384007 10.111614,39.391102 9.000102,39.540627   C6.670599,39.853996 4.211631,39.204945 1.402912,38.975540   C1.000000,37.611111 1.000000,36.222221 1.000000,34.416668  z"
              />
              <path
                fill="#F7AB36"
                opacity="1.000000"
                stroke="none"
                d=" M26.607746,25.538643   C32.709545,20.834213 38.959522,20.478586 45.025177,24.312168   C50.014885,27.465740 52.386375,32.471657 51.715725,38.444962   C51.005592,44.769974 46.300480,49.836842 40.151814,51.459599   C34.301861,53.003510 27.241030,50.183216 24.065359,45.034210   C20.235704,38.824844 21.017870,32.172852 26.607746,25.538643  M40.407631,44.311935   C44.999081,40.806675 46.274197,37.388401 44.291992,33.351551   C42.396683,29.491673 39.222717,27.746513 34.951336,28.597509   C30.361172,29.512022 27.537861,33.730560 28.325846,38.163288   C29.225647,43.225010 33.268665,45.544701 40.407631,44.311935  z"
              />
              <path
                fill="#3A4047"
                opacity="1.000000"
                stroke="none"
                d=" M134.796661,50.748657   C130.178848,55.290726 125.201752,55.539196 119.377953,52.893997   C119.227051,55.877167 119.090515,58.576286 118.939468,61.562180   C116.524635,61.881073 114.184509,62.914768 114.218643,58.889370   C114.296165,49.747826 114.243065,40.605179 114.243065,31.587835   C118.642456,31.087435 122.709221,30.066830 126.709686,30.281527   C136.162262,30.788828 141.829636,42.478718 134.796661,50.748657  M131.640671,38.050274   C130.453339,37.195007 129.381500,35.983471 128.056198,35.553776   C124.597206,34.432285 121.287239,35.108467 119.388191,38.369827   C117.532959,41.555927 119.423080,47.994164 122.164223,49.362034   C125.657028,51.104992 130.486115,49.904457 131.890656,46.252743   C132.737808,44.050217 132.044113,41.255039 131.640671,38.050274  z"
              />
              <path
                fill="#3A3F47"
                opacity="1.000000"
                stroke="none"
                d=" M308.889618,31.103716   C309.301025,38.680721 309.301025,46.094231 309.301025,53.518635   C305.488739,53.960644 301.589905,54.800640 297.699005,54.765339   C292.864166,54.721478 289.068848,52.263687 287.158813,47.694084   C285.306213,43.261951 285.659821,38.874401 288.733185,35.002876   C291.803986,31.134642 295.767914,29.862267 300.687622,30.781153   C303.206512,31.251629 305.876495,30.913111 308.889618,31.103716  M303.029144,36.523861   C301.293091,36.062531 299.154907,34.739578 297.906128,35.322369   C295.439148,36.473679 292.105133,38.386635 291.643616,40.526825   C291.113098,42.986931 292.557709,46.986687 294.538544,48.540890   C296.289734,49.914913 300.801971,49.978081 302.602936,48.628559   C306.557129,45.665577 305.426300,41.131062 303.029144,36.523861  z"
              />
              <path
                fill="#3C4149"
                opacity="1.000000"
                stroke="none"
                d=" M374.333862,43.733395   C372.569855,47.349590 375.179260,50.439774 379.704926,50.301968   C381.272827,50.254223 382.789307,49.242359 384.379639,48.996075   C385.905090,48.759827 387.495850,48.945038 390.301147,48.945038   C384.662872,55.260548 378.428436,56.274120 373.043579,52.958984   C367.960541,49.829662 366.043823,42.972271 368.632202,37.176388   C370.940491,32.007603 376.160919,29.505959 381.766815,30.882210   C387.239716,32.225803 390.247925,36.985966 389.601898,43.738224   C384.695282,43.738224 379.745483,43.738224 374.333862,43.733395  M379.365906,39.748341   C381.095703,39.671654 382.825500,39.594967 384.555298,39.518276   C384.747833,38.945267 384.940369,38.372257 385.132935,37.799248   C383.017120,36.790539 380.887512,34.967060 378.789429,35.002647   C376.698090,35.038124 374.638336,36.937943 372.564758,38.020351   C372.793793,38.596317 373.022858,39.172279 373.251892,39.748245   C375.004211,39.748245 376.756500,39.748245 379.365906,39.748341  z"
              />
              <path
                fill="#3B4148"
                opacity="1.000000"
                stroke="none"
                d=" M217.957428,54.136513   C208.066650,55.922516 201.610916,50.990997 201.785950,42.192329   C201.923370,35.285423 206.819382,30.290079 213.309937,30.434530   C220.057388,30.584698 224.257874,35.700184 223.782593,43.647697   C218.241150,43.647697 212.660706,43.647697 207.028717,43.647697   C207.987381,49.752544 212.535065,51.841339 218.040283,49.371548   C219.483337,48.724148 221.340317,48.999352 223.007217,48.850849   C223.174103,49.492798 223.341003,50.134743 223.507904,50.776688   C221.785538,51.857861 220.063171,52.939034 217.957428,54.136513  M213.428650,39.751263   C215.160706,39.751263 216.892746,39.751263 218.624802,39.751263   C218.860672,39.190166 219.096527,38.629066 219.332397,38.067970   C217.301605,36.972023 215.260651,34.994198 213.242737,35.017414   C211.033371,35.042835 208.845261,36.916451 206.647888,37.984612   C206.877502,38.573463 207.107117,39.162315 207.336716,39.751167   C209.079300,39.751167 210.821869,39.751167 213.428650,39.751263  z"
              />
              <path
                fill="#393F46"
                opacity="1.000000"
                stroke="none"
                d=" M182.517334,36.753151   C185.289642,45.006962 182.328613,51.923801 175.482117,54.013115   C169.029388,55.982262 162.236115,52.541542 160.305176,46.326160   C158.461609,40.392006 160.994720,34.236485 166.375931,31.574057   C172.067734,28.757954 177.789856,30.505335 182.517334,36.753151  M176.007065,48.717659   C176.918610,47.363998 178.635101,45.971573 178.572174,44.664833   C178.445724,42.039364 178.109940,38.625744 176.436127,37.099201   C174.786926,35.595100 171.000946,35.056080 168.850998,35.891411   C166.946884,36.631229 165.137573,39.714725 164.802689,41.987022   C163.915100,48.009407 168.924652,51.193321 176.007065,48.717659  z"
              />
              <path
                fill="#393F46"
                opacity="1.000000"
                stroke="none"
                d=" M325.675598,35.442528   C320.806946,38.447731 319.375458,43.120735 321.842499,46.856941   C324.282288,50.551861 328.361115,50.881538 333.294617,48.256893   C334.548889,47.589619 336.459900,48.156834 338.680573,48.156834   C335.157837,53.859192 330.450348,55.711983 324.931549,54.341797   C319.703491,53.043800 316.203491,49.021358 315.757538,43.798386   C315.289948,38.322037 318.248138,33.249905 323.056335,31.283836   C327.930359,29.290842 333.316803,30.801151 337.431091,35.430038   C336.063110,37.552750 334.932556,38.816357 332.149231,36.615353   C330.688568,35.460289 328.117889,35.708893 325.675598,35.442528  z"
              />
              <path
                fill="#383E45"
                opacity="1.000000"
                stroke="none"
                d=" M347.402863,38.915573   C345.816559,42.923782 346.277039,46.245327 349.497223,48.645435   C352.726349,51.052147 355.913757,50.269203 359.225433,48.282574   C360.409058,47.572556 362.376251,48.168758 364.663757,48.168758   C360.846436,53.919834 356.219177,55.723793 350.816833,54.346550   C345.323914,52.946217 342.018646,48.930756 341.708954,43.281631   C341.419708,38.004734 344.320831,33.219955 348.969055,31.307625   C353.906036,29.276499 359.225189,30.773026 363.660858,35.911663   C362.701569,36.648716 361.692688,37.423893 360.712433,38.177071   C353.958466,33.983330 351.951660,34.056396 347.402863,38.915573  z"
              />
              <path
                fill="#383E45"
                opacity="1.000000"
                stroke="none"
                d=" M229.620850,36.896549   C235.706375,28.802820 243.536423,28.304743 250.014923,35.435066   C248.613129,37.487366 247.534454,38.828827 244.723358,36.584389   C241.690613,34.162991 238.036575,34.318230 235.289154,37.412540   C232.528976,40.521198 232.285629,44.084728 235.006775,47.389675   C237.755173,50.727718 241.382355,51.135189 244.826202,48.848312   C247.326111,47.188263 249.126938,46.532276 250.891602,49.454582   C246.227997,54.941265 240.363495,56.272087 234.544220,53.165318   C228.972107,50.190495 227.307602,45.009750 229.620850,36.896549  z"
              />
              <path
                fill="#3A4047"
                opacity="1.000000"
                stroke="none"
                d=" M408.374451,31.348118   C409.231873,32.453022 409.753540,33.381226 410.275208,34.309418   C409.359283,34.810055 408.488525,35.474251 407.509064,35.744549   C406.994843,35.886448 406.234375,35.048061 405.681763,35.154453   C403.728882,35.530445 401.817719,36.123199 399.890747,36.633774   C401.313690,37.818256 402.632263,39.171169 404.190796,40.136845   C405.571747,40.992493 407.617767,41.037678 408.653900,42.123901   C410.123291,43.664307 411.920837,45.915565 411.768127,47.708923   C411.594299,49.750050 409.862000,52.383160 408.043915,53.417656   C403.413879,56.052143 398.767914,54.623985 394.455963,51.961674   C396.032532,48.442627 396.028137,48.456566 399.063629,49.412025   C400.161682,49.757652 401.377594,50.439400 402.377930,50.222263   C403.971619,49.876343 405.429779,48.906151 406.945221,48.199951   C405.783417,47.083435 404.650604,45.933945 403.441528,44.871201   C403.093506,44.565304 402.531677,44.490429 402.057770,44.341866   C395.655609,42.334961 393.745544,39.977348 394.996582,35.614883   C396.138214,31.633934 400.716522,29.607918 406.102539,30.708246   C406.752319,30.840986 407.393494,31.015991 408.374451,31.348118  z"
              />
              <path
                fill="#383D45"
                opacity="1.000000"
                stroke="none"
                d=" M268.066833,52.890968   C262.489136,56.494072 256.522400,53.545364 256.163330,46.946938   C255.767822,39.679073 256.073120,32.373070 256.073120,25.144032   C260.678772,24.299910 260.678772,24.299910 261.266327,30.668467   C263.320404,30.790218 265.430359,30.915281 267.947815,31.064501   C267.947815,32.345852 267.947815,33.656067 267.947815,35.123100   C265.655640,35.258160 263.542419,35.382671 261.027069,35.530880   C261.027069,39.076496 261.077911,42.375969 261.011658,45.673088   C260.954376,48.522644 262.206879,49.864952 265.090118,50.219254   C266.143463,50.348690 267.047363,51.694214 268.066833,52.890968  z"
              />
              <path
                fill="#373C44"
                opacity="1.000000"
                stroke="none"
                d=" M195.679489,54.296185   C193.640945,61.026215 190.854355,62.714142 182.874908,61.470631   C184.495773,59.874805 185.407761,58.220985 186.678696,57.871128   C190.121872,56.923306 190.964600,54.713558 190.929291,51.555714   C190.855194,44.929142 190.906799,38.301167 190.906799,31.251722   C192.392807,31.115499 193.764893,30.989721 195.722794,30.810240   C195.722794,38.722389 195.722794,46.295650 195.679489,54.296185  z"
              />
              <path
                fill="#353B43"
                opacity="1.000000"
                stroke="none"
                d=" M143.903061,36.134743   C143.903061,34.181305 143.903061,32.710468 143.903061,31.494728   C148.357086,31.184629 152.376999,30.904755 156.742447,30.600824   C156.742447,31.894941 156.742447,33.276825 156.742447,34.669064   C149.532440,35.999706 148.874954,36.784245 148.872665,44.000381   C148.871658,47.142822 148.872482,50.285259 148.872482,53.791977   C147.249176,53.958942 145.861954,54.101627 143.903061,54.303112   C143.903061,48.184891 143.903061,42.401119 143.903061,36.134743  z"
              />
              <path
                fill="#F8AE3F"
                opacity="1.000000"
                stroke="none"
                d=" M77.932114,56.684219   C79.846550,58.570923 81.833282,59.991798 82.978951,61.913975   C83.714737,63.148453 83.212288,65.120941 83.264862,66.762627   C81.652550,66.696159 79.776825,67.124107 78.493378,66.440346   C76.820435,65.549072 75.380463,63.937862 74.284874,62.332920   C73.370987,60.994164 73.097687,59.218121 72.540688,57.635742   C74.243118,57.234108 75.945549,56.832474 77.932114,56.684219  z"
              />
              <path
                fill="#27B49C"
                opacity="1.000000"
                stroke="none"
                d=" M19.483147,20.656929   C14.958897,21.607332 13.340103,18.311699 11.728767,15.597040   C11.437891,15.106993 13.785693,11.950638 15.074978,11.836988   C18.423376,11.541827 21.218260,17.064142 19.483147,20.656929  z"
              />
              <path
                fill="#373D44"
                opacity="1.000000"
                stroke="none"
                d=" M196.123962,22.064394   C195.151306,23.636963 194.218765,25.019983 192.926254,25.825127   C192.596466,26.030563 190.596313,24.549536 190.330917,23.578876   C190.073990,22.639194 191.090622,20.389458 191.499161,20.401264   C193.020416,20.445232 194.521637,21.182878 196.123962,22.064394  z"
              />
              <path
                fill="#FFFDF9"
                opacity="1.000000"
                stroke="none"
                d=" M40.054924,44.501225   C33.268665,45.544701 29.225647,43.225010 28.325846,38.163288   C27.537861,33.730560 30.361172,29.512022 34.951336,28.597509   C39.222717,27.746513 42.396683,29.491673 44.291992,33.351551   C46.274197,37.388401 44.999081,40.806675 40.054924,44.501225  z"
              />
              <path
                fill="#F8F8F8"
                opacity="1.000000"
                stroke="none"
                d=" M131.841736,38.388222   C132.044113,41.255039 132.737808,44.050217 131.890656,46.252743   C130.486115,49.904457 125.657028,51.104992 122.164223,49.362034   C119.423080,47.994164 117.532959,41.555927 119.388191,38.369827   C121.287239,35.108467 124.597206,34.432285 128.056198,35.553776   C129.381500,35.983471 130.453339,37.195007 131.841736,38.388222  z"
              />
              <path
                fill="#F8F8F8"
                opacity="1.000000"
                stroke="none"
                d=" M303.347473,36.779228   C305.426300,41.131062 306.557129,45.665577 302.602936,48.628559   C300.801971,49.978081 296.289734,49.914913 294.538544,48.540890   C292.557709,46.986687 291.113098,42.986931 291.643616,40.526825   C292.105133,38.386635 295.439148,36.473679 297.906128,35.322369   C299.154907,34.739578 301.293091,36.062531 303.347473,36.779228  z"
              />
              <path
                fill="#E3E3E4"
                opacity="1.000000"
                stroke="none"
                d=" M378.937347,39.748291   C376.756500,39.748245 375.004211,39.748245 373.251892,39.748245   C373.022858,39.172279 372.793793,38.596317 372.564758,38.020351   C374.638336,36.937943 376.698090,35.038124 378.789429,35.002647   C380.887512,34.967060 383.017120,36.790539 385.132935,37.799248   C384.940369,38.372257 384.747833,38.945267 384.555298,39.518276   C382.825500,39.594967 381.095703,39.671654 378.937347,39.748291  z"
              />
              <path
                fill="#E3E3E5"
                opacity="1.000000"
                stroke="none"
                d=" M212.996552,39.751213   C210.821869,39.751167 209.079300,39.751167 207.336716,39.751167   C207.107117,39.162315 206.877502,38.573463 206.647888,37.984612   C208.845261,36.916451 211.033371,35.042835 213.242737,35.017414   C215.260651,34.994198 217.301605,36.972023 219.332397,38.067970   C219.096527,38.629066 218.860672,39.190166 218.624802,39.751263   C216.892746,39.751263 215.160706,39.751263 212.996552,39.751213  z"
              />
              <path
                fill="#FAFAFA"
                opacity="1.000000"
                stroke="none"
                d=" M175.661346,48.915878   C168.924652,51.193321 163.915100,48.009407 164.802689,41.987022   C165.137573,39.714725 166.946884,36.631229 168.850998,35.891411   C171.000946,35.056080 174.786926,35.595100 176.436127,37.099201   C178.109940,38.625744 178.445724,42.039364 178.572174,44.664833   C178.635101,45.971573 176.918610,47.363998 175.661346,48.915878  z"
              />
            </svg>
          </Link>
        </div>
        {!currentUser ? (
          ''
        ) : (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {pageIndexUser.map((p) => {
                return (
                  <li key={`id-${p.pageName}`}>
                    <a className="link-custom-nav" href={p.href}>
                      {p.pageName}
                    </a>
                  </li>
                );
              })}
              <li>
                <a className="link-custom-nav" href="/personaldata">
                  Profile Page
                </a>
              </li>
              <li>
                <details>
                  <summary>Dashboard</summary>
                  <ul className="p-2">
                    <li>
                      <a className="link-custom-nav" href="/dashboard/mentors">
                        Dashboard Mentor
                      </a>
                    </li>
                    <li>
                      <a className="link-custom-nav" href="/dashboard/mentees">
                        Dashboard Mentee
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Matching Info Input</summary>
                  <ul className="p-2">
                    <li>
                      <a
                        className="link-custom-nav"
                        href="/matchingdata/mentors"
                      >
                        Matching Data Mentor
                      </a>
                    </li>
                    <li>
                      <a
                        className="link-custom-nav"
                        href="/matchingdata/mentees"
                      >
                        Matching Data Mentee
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Matching Overview</summary>
                  <ul className="p-2">
                    <li>
                      <a
                        className="link-custom-nav"
                        href="/matchingoverview/mentors"
                      >
                        Matching Overview Mentor
                      </a>{' '}
                    </li>
                    <li>
                      <a
                        className="link-custom-nav"
                        href="/matchingoverview/mentees"
                      >
                        Matching Overview Mentee
                      </a>{' '}
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        )}
        <div className="navbar-end">
          <div className="card blurry flex flex-row">
            {currentUser ? (
              <div className="avatar mr-4">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      currentUser.photo
                        ? currentUser.photo
                        : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRUSEhUVGBgVEhISGBgREhIREhIRGBgZGRgVGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHxISHjQrJCE0NDQ0NDQ0NDQ0NDQxNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAABAAIDBAUGBwj/xABCEAACAQIDBAgEAgcFCQAAAAABAgADEQQSIQUxQVEGEyJhcXKRsRQygaEHUiMzQsHR4fA0YnSCkhUWRHOisrPDxP/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACMRAAICAgICAgMBAAAAAAAAAAABAhESIQMxQVEEYRMicRT/2gAMAwEAAhEDEQA/APIKw7TeZvcxtpJWHabzN7mMmtE2K0kAkYkyiDRURBYtI82+0YTEWC0NoI6BI2Ax0aYxMbLKcLC+krDhLaEm5GlhKRkxpvxOhO6IE2NhpCtriwueMs0cE7o7gHKgzv8A3U/N4QbS7Ek30VOOuukFjp3mdZsTYdGorio9nIugGjMR8wF/6N5awux6KM9OomZTexJGbOpU6cha+kyfLFGi45HEMBrxjWBnX0djYeuWWmzIys2jMhRgNbgk6HQ6C8z9o9F61O91JsM19LWguSLG4tHPLJ7a2Y8I0Ujex011vpbxvDoL8fvLJehpOm7jIpK4NgJFKQmG8mw9O51BPhIRLuz8Z1ZJte8uNWRNtR0tkVSibFgNL2kEnq4ktcbgTe0gvzjlXgUbrYg1t0tIQV5sZUlrDasuW1wb6wiElqzVu/5IpodbU/KvrFNMTm/I/RyVcdpvM3vIrSWqe03mb3MaVmFWtHb0MEnTcTIbSRDpJaLj2OJjTDDaI0GwwQmAgGAiOjTGSxnGWUsRc7+UreEu4cAgA2W12LHcAPcxmTA9XKQ1rWGgtvk+Gxjl2OY9tchF945HnKGLqh3LDQbgDvsI7DKbjQ/TnMJPI2gsTo6bogQMTa11cHW4sMp5MNN8nfbKKyhRm1Ck1CSMhABtyG7XumdUBdbWN7W3b7c++WdnbKLhlt2it18eIExwvs2zrou/C0bv1bgEg8QEzHhfeNP5y3htr1aIVKt3pMQoZQpcNbQrfUgDXWc/W2Q6nKL6a7jp/X7oMCLP22cngL7r7z9hFi1sMlLVF3bezhm6wMCGuRYh83fYXAnOMhGhFrnjpOkxtUqq06iMVPytT3gn82b+UxKiAHLnJ1vZwQ/geBmvHN+TKUSnUHAmQywxGul+/dItDzE6UYsbCDwiIHPWCUSHxi7ovGLugAPGFWy6iDxi7oDNX4tucUiywR79ixXoquBmYn87e5kZYXNvp4RVvmbzN7mMtIWnZb2SERIeEajR5EtrJWhReLJFWBoka++JpnRsnY0QxCGADTAY6NIjRDIzJMQ5sE+sYY0tc+gkzehJbH0qdzN/Y2y3qsEprfmSJDsHZ5quKaDxPvPXNhbMSggVQL6XNt5mNmiVmHsvoYVsahHgBOlwmwaam+Xd7zYp0wZYCARUO0jKq7NpkWKj0E5rbXRik6kouVrX0na1RKGIXSKmi7TPHMQ9SmTTdyy3sAb3H3mZjK5uLqBxBOv33zv+kOxQ4LAa6n6zzvH8VPCJJEytEWJNwGFtd/m4ypJ6BBVgb9kg6cj/AEIwpx4Tpg9GElsji8ZIyRpS80skkCaCCqlt5gIjSL/SFiSdj0pXG+NZbeEWU2jbcIWh0y9Yc4oskUmwKNb5m8ze8ZH1vmbzN7xsBgj1aNElpDQ3jTrY0r0K3KLNeFhY2iI4y3FSVoSk4umOWKBSIZnRrdjTBHGCBLImjAbR7SEyOTwKJ3X4cv8ApGJ5T1eko3zyH8Pns7ngCt/rPUX2pTQ5CSWAuQis5APcJkaro26EsXnO/wC8+GUgMzrfcXo1EF/EialHHo4uhBEoXZaqSjXS8GJ2gEBLbhy3mcxiek2IclcPhwF3Z6rhUPgSQCe4XtJdFdGpj6d1IPETxvpLTyVmA3Gd/iK2LHbarQfmiOzC3EXygfecZ0po3VKxFszEaMrD6EaGSuxydoxcDWy5wADmW2scyEAXOhMrYb5rHTeNdJcIAI4i3jNodGMiMWBJAuLQMhAF9xjsxsbaAmJgARc3FvGaEjbAHTURtja/Ax4JAJA0MDLa1zpAAMoBHGAcSBpCGsSQNIiDa998ALV4Y+y84oxUzLrfM3mb3jI+t8zeZveMjAUloyISSkdYmtDj2SvykYMkYxpEIvE0lHIRHERt45TCy8RNJRTVowUnF0xt4IrQTOvBrd7A0mxGy6yoKz02VGsQxHZIO7wv3yFhfSembD2SmKoli7Wq0lBGY5QQMpUjuI+0y5XVFccU7+jD6I1qFOkWXO1R3VGDqoQPlZgFsbkWUzUxO0Gp5etLVHftBLnIvcEFgTFsPY6IrIuuSsxvvuQrLf0JnZ4bYqmzAjMfzLmHgBwmLeysdHF4Xa9V7hKLIApYhlKKwBAta9idd2s6PYuKcMmVLBzYqRYA20ty3H0mv/snXtMLDglMJ9yTIlo/pxb5UA38XI/gTH2yoxorbddy6JZQpzFrEnMALgE6W/hOcx2yMRUIbrFVww00KdWNwtcW8B6zrNvU2DIyalWBtvLLxXxIv9Zfo4VHAYqp8QNO6HT0NxtbPN6GwMRTdb1VcneCBnY91uHjFjVxFLP1LFC1F0YKqkXsG/aB32YXH5p6f8GiiyKov+VQJyvSCgAS3+X6X3+33kO7sMdUeebG2XUValV7WZCvaAbMo3n+uUyVYi5A0nc47NTwDNa/bKDyuxHsTOFYG177zqJvwpu2zPlaSSQmW2W50PCNzWJKjSOBAN1F7CNN7X4EzUxAQbC50MQsDpqLQ2AI4iC51IGhjYA1sSNxgIAtxhYWtrpEDqSBEBoZ15RRmeKLBlZIzK3zN5m942T1qYzN5m95GacM0aPgkMhTfHdVEqWjyQlwyT6JBEYlgMWSNMGPIvAhgBgYkyozoynxtoc6cRGMserkQP3TSWPaMoqS00RTuvw22iFdsNUNlqBmQk2/SDeoPeBf6ThmE1dg03apTVPm6xcvmvb0mU0nGi4txdnp+Gwop4goBZSA49j97zo6NRkHyFxzQoD6MROWwW16Fco1KoHexzKD2gOdt41m5WruqdnXQzltI3Stj8TtVmbJTRgeJcpZf9JMGEpm6Bjq13N+ZtG7NRQtiwJJux45uMr4zZVYN1mHqsLa5GIKnuB3iNeym10am1qKhASdVsRrvtwmSFcOeqcC4VspBZbnfccDpK9Wniaxy1A1NR8xuNfrJE6nDqb1FB3ku4JP1JkvbKT0amHxLNcM9mGhCqBbwJvpMvbKjIQLnQm5NyfE8Y3B4lcQ4alcgWBaxCsp4A8Y7H07ZxyElsVHFdLsUVp06K9kEZ25kqBb3JnIFlFra85dx+0TVzhwCwrkI24imAVKeGinxvzlHibDdznVxaRzT3Kxpq6m2l4tNOMldEygg68ZFx0mpFBD7yBpGnhroYjuitAKDcA6CC59YCYxjwiQM0so5xSGx5xR2wolq4ftN5m95H8PLL1O03mb3i6wTjPWoq/DxdRLgqCODCAUUOpMHVGaOkGQQ2BndWYshml1Yg6oR2wpGblMWTumiaAg+HjthijOyd0noVcl2G8DnaWfhpBi8OcoCjeYZMz5IJxZY6I45KWJQkmz9i50tc6fcCe34EKwyncRp4GfORUjUaWPDeCJ670J6RivTCObOgCnvPMSZI5Is1dv7AQkVKbOjBszdW7JnHG9uMt7NwOGdVtWqo1gLNUNyc1v2tCbTTftr9jKKYHKTltv3MuYfyhFqjVNNU3RPiNkYZcxqV3YADKGqAn/AKRrxmJtnDYZ7U6CCxY9og3sbbid82jhnPBB4J/GVnwhBudTCTSKjS7dkuzKS007IsFFh6aTn+kePFKjUc8ifruAm3iawRLE8bmeVdMdqvXqdUoIRSD5ja4+gmcdshmDg6ZYFydc3qZfTAA5usfIbXHeJBh0C2B4cuJkm+/2vNVJro0jwJrYX2cVRalxY+sjpYFmzEMBbnxEkFXs5Tm9dIX+UHMbm2kpcjB8ESo1EixtpImJubCaDDcCbLGnDqWCqdDxOkpcnsl8C8MzbGNI4G81Hwlmy3vx0gp4O5IuBbnK/KiH8b7Ier8Ypo/Dd49YofkQv879mVUq9pvM3uYBVlirQGZtP2m95GcOJho60pAFWEVovho04Y84DuXolFaIV5D1Dc4DSaAZP0WhXjhXlLI3KK7cjAeX0XxiI4YiZuc8jF1kNhlE1BiI8V5lCrHCrDYsoktbCBixBADa25NOn6D7O1rANc2pkcLEZrETmcOruwSmrOzaBUBLH+XfPSuhuxHw+Y1SM9RQSoNwgG4X4nWDbMORQ8dl/CbYamwSsO7NwPjOpoVkYBgRrreYu0tmK4OmvOc21PEUCRTY25HUfyi6MT0V6qgb5j7R2iiAsSNAfE904x9o4ltCbeAkXwrvrUZmPedJMmWlRPWxb12PBAd3Oc3tCkDUfxt6TqsHSyoTbdcTzfaGJfrqpzEfpH0ud19NPCOCtjzxdmn8KIjhZnUse/jLPxnHWXRpHmi/JMcJGHCQLi5IMXDRqm30RthjGnDmWBihHDFCKkFsqrTYG/GNdCTcy716xwqKY6QX9EXV90Mv5lihRN/RjVCMzeZveAESrUqdpvM3uYBViNFJF0WjgolMVoRWhY7LmQRdVKwrx4rwAlNGDqY0V48V4aGN6jujThhylgVoHxKqNftvhVkSaStlRsKOUqui3AXU3A7rmPxGKL6bhyH75Cq3lqJx8vMnqJ7l0X6L08NSWwu7qC7nVibbhyA5S5iKdnU9xHtH9DdqjE4OlUv21UU3HEVEAB9RY/WWcamoMyadkJ6Eq3Eq10XcwEmR7aSHEXMYIrfCUzw9pSxqKuiiaXVLbSZ+1GVEJ420EllpmLVfLSPNmb7meb9IFtXa3FaZPjlF56R1JYAH9lbnxnm23Wvianc+X/SAJXGtkcnRRky1LDn4yAiOWbGVkoc+HhJ1qc5XBhiaKUmuiz4GMZyJErQuSRYSXE3hzSumPFWHrZWs3KIk8pJ0ZfRr9bFKuY8jDAMxlbCjM3mb3kJw80HYZj5j7wWEC8EZxotB1bTSyCLq4BgjOOblFmPfNHqYvh4Bi/ZnCrHCrLb4cDU2tKLuL9kRqNmfJPDtkrVrSBnJjRFaaKNHDPklJ7HCOA5SK3KPVozNo7T8N+kIw1c0na1OuVW5OiVRorfXd6T2OrTzCfNU9g/DvpitZVwmIa1ZAFRmP65B3/nHEcd/O0yj5Ki/B0j09Yx2tNipRBmfXwszaNEY+IrATONM1G424kzXq4UcRJ0oBUZrbgTIqzS6MvDYa6u3m9BPFsTUz1HcbmqOw8CSRPWemu11wmD6lT+lxClBbeiH53PrbxM8hXdNYRpGMnbEYYgITNCAgw3jDCDAB14i9jBIyYFGulC4B5i8TYfukuBxIyKDwFpY65ZlSPRjJtJjPhzyil7rBFCkPJnOPV7TeZvcxwrStUp9pvM3vB1Z5woIuVdFwVY9a0oWaHMeUVDyflGktaOWtMwVYetvGkxS5FFWyTHVyxsPlH3POVbR8RmqR5k5uTtjYiITG3gShQZucMMBgziPSpYggkEEEEEggjiCNxjcsVhANHonRz8S3phaeMU1FGgqJbrAP767m8Rr4zu8B0swdcDJiKdz+zUcU3/0tYz5/N4CeYkuKGpNH0PWdWZbEEXvcEEW8Zg9JunWEw2alSJrVBoRT/VqeTPu9LzxYVWAsrMByDMB6CJFiUS5SL21tp1MTVavWOp0AHyoo3KvdKYgYx0szAITAIiYAKIRCKABMjEexkawAtUalhaS9bKqgndDZuUxfZ38cv1WjW6yKVrnlFAvMrP8zeZveGNqHtN5m9zAGlGkZKh4hkYaODwNFJDrSFm1kt5A375cTk+Y/wBUh0UbmtD3yjzqGsYFhYRgMRS6HwwGG8ACIGYQwZYCGZyd0ITnJIhCgsAWImG0Y0AWxCOjRHQGxsEIitABCExKITABjRojmjRADQ2bTzZhyt++XGwhmfs6tkfxBE1xixM5JWd/A24/wf8ACnlFLXxIiipGls5dz2m8ze5giqfO3mb3MURCBDFFAoUZHyLjLic/yNpBMANoWjTLOVEl5EwjlaBmETBISGOEiUyWMbDCIBDAkMUEUYhExphMbeIpDhCY0QwAQiihEAFAYojABjQCFoIgHKbEGWuslVRePNMyZKzr+Pkk6WjV6yGV8rRScWb2/RTr/M3mb3iMWIHabzN7xKdBEQuxRRRQKFImksiaXEw5+kC8UEJlnKNgaOMa0TKFHqYxd0csEJkkU9K6GbKpfA10xNIt8QadZ7W61MCoZUxVEa5stQuWGhy8DcA87U6Prh67YbFBmZ2pDDtSUutdHzWddRcHsjmCR3yqIcjmUQscqgk8lBJ9BLybGrk26pgSGIDDJfKL2F+PADiTbfO3obArmmEpKgKUqqkLUsz01UU65KU2YM5aorgGx7I13CWdq4VKGenWxbK5IAekKeHppn60BuznZgKyLnsQbPruIlYryZub8Hnu0dlvRVWcrZ2Kgo2YGyo2/wDz7t+nhM+d5tnpFgUWrRw1AVDUoVabViXDtUZiEOZu0yqAGvx0Gk4MSZV4NIttbCIiYLxRFBhMaITAAiIxCImAFjB7LrV79TSd7GxyC4B5EzfwHQPFuQagWkvEuwZvoq/xnWfhnQy4Yv8AnqufovZHtOurnSZSm09G0YJ9nkHSDZFPDFKaElspJY72N/tMW06TpzVviAOSD7kzm7xxdrZ6PGkopIu2hiilFGbX+ZvM3uY1N0UUzOVdhiiigUKMiilxMOfpEbQxRSzlAYIooFAXd9YYooEn0Bsn5tlf4L/0NOH6UfqdheVv/JSiilmC7Oq6Rf8AEf4ul/8AFPGcd+uq/wDMf3iijkLj8ldoBFFMzoXQVjTFFABCOiigARAYooAewdAP7HS/z/8Ae06LE7oopzS7Z1R6R5D01/tJ8i+7TAEUU0j0jsh0X4oopZR//9k='
                    }
                    alt={currentUser.email}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
            {currentUser ? (
              <SignOutButton />
            ) : (
              <>
                <Link href="/signUp" className="btn-custom-primary">
                  Sign Up
                </Link>
                <Link href="/signIn" className="btn-custom-primary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
