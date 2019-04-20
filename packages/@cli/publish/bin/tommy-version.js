#!/usr/bin/env node

const ghpages = require('../lib/index')
const program = require('commander')
const path = require('path')
const pkg = require('../package.json')
const addr = require('email-addresses')
const moment = require('moment')

function publish(config) {
    return new Promise((resolve, reject) => {
        const basePath = path.join(process.cwd(), program.dist)
        ghpages.publish(basePath, config, err => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}

function main(args) {
    return Promise.resolve().then(() => {
        program
            .version(pkg.version)
            .option('-d, --dist <dist>', '所有源文件的基本目录')
            .option(
                '-s, --src <src>',
                '用于选择要发布的文件的匹配模式',
                '**/*'
            )
            .option(
                '-b, --branch <branch>',
                '用于选择发布分支',
                'gh-pages'
            )
            .option(
                '-e, --dest <dest>',
                '目标分支中的目标目录(相对于根目录)',
                '.'
            )
            .option('-a, --add', '仅新增。不删除原有文件')
            .option('-x, --silent', '静默模式。不产生输出')
            .option('-m, --message <message>', '提交信息 (defaults: "update at {{ now(YYYY-MM-DD HH:mm:ss) }}")')
            .option('-g, --tag <tag>', '标签信息')
            .option('-t, --dotfiles', '包括 .')
            .option('-r, --repo <repo>', '推送仓库地址')
            .option('-p, --depth <depth>', '深度克隆', 1)
            .option('-o, --remote <name>', '推送远程名称', 'origin')
            .option(
                '-u, --user <address>',
                '用户信息 (defaults: "git 用户的配置信息").  格式 "Your Name <email@example.com>".'
            )
            .option(
                '-v, --remove <pattern>',
                '删除文件的匹配模式 ' +
                '(如果和 --add 配置一起使用，则忽略).',
                '.'
            )
            .parse(args)

        let user
        if (program.user) {
            const parts = addr.parseOneAddress(program.user)
            if (!parts) {
                throw new Error(
                `Could not parse name and email from user option "${program.user}" ` +
                    '(format should be "Your Name <email@example.com>")'
                );
            }
            user = {name: parts.name, email: parts.address}
        }

        const config = {
            repo: program.repo,
            silent: !!program.silent,
            branch: program.branch,
            src: program.src,
            dest: program.dest,
            message: program.message || `update at ${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            tag: program.tag,
            dotfiles: !!program.dotfiles,
            add: !!program.add,
            only: program.remove,
            remote: program.remote,
            user: user
        }

        return publish(config)
    })
}

if (require.main === module) {
    main(process.argv)
        .then(() => {
            process.stdout.write('Published\n');
        })
        .catch(err => {
            process.stderr.write(`${err.message}\n`, () => process.exit(1))
        })
}

exports = module.exports = main
