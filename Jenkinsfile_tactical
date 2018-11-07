#!groovy

properties(
    [[$class: 'GithubProjectProperty', projectUrlStr: 'https://github.com/hmcts/ccd-definition-import-web/'],
     pipelineTriggers([[$class: 'GitHubPushTrigger']])]
)

@Library('Reform')
import uk.gov.hmcts.Ansible
import uk.gov.hmcts.Packager
import uk.gov.hmcts.RPMTagger

ansible = new Ansible(this, 'ccdata')
packager = new Packager(this, 'ccdata')
env.TEST_BROWSER = "ChromiumHeadless"

milestone()
lock(resource: "case-definition-import-web-${env.BRANCH_NAME}", inversePrecedence: true) {
    node {
        try {
            wrap([$class: 'AnsiColorBuildWrapper', colorMapName: 'xterm']) {
                stage('Checkout') {
                    deleteDir()
                    checkout scm
                }

                stage('Setup (install only)') {
                    sh "yarn install"
                }

                stage('Lint') {
                    sh "yarn run lint"
                }

                stage('Node security check') {
                    sh "yarn test:nsp"
                }

                stage('Test') {
                    sh "yarn test"
                }

                //stage('E-2-E') {
                  //  sh "yarn run e2e"
                //}

                stage('Sonar analysis') {
                    sh "yarn sonar-scanner"
                }

                onDevelop {
                    publishAndDeploy('develop', 'dev')
                }

                onMaster {
                    publishAndDeploy('master', 'test')
                }

                milestone()
            }
        } catch (err) {
            notifyBuildFailure channel: '#ccd-notifications'
            throw err
        }
    }
}

def publishAndDeploy(branch, env) {
    def rpmVersion
    def version

    stage('Package application (RPM)') {
        rpmVersion = packager.nodeRPM('case-definition-import-web')
    }

    stage('Publish RPM') {
        packager.publishNodeRPM('case-definition-import-web')
    }

    def rpmTagger = new RPMTagger(
        this,
        'case-definition-import-web',
        packager.rpmName('case-definition-import-web', rpmVersion),
        'ccdata-local'
    )

    stage('Deploy: ' + env) {
        version = "{case_definition_import_web_version: ${rpmVersion}}"
        ansible.runDeployPlaybook(version, env, branch)
        rpmTagger.tagDeploymentSuccessfulOn(env)
    }

    stage('Smoke Tests:' + env) {
        sh "curl -vf https://case-definition-web." + env + ".ccd.reform.hmcts.net/health.json"
        rpmTagger.tagTestingPassedOn(env)
    }
}
