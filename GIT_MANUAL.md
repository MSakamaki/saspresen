thubへ登録
===========
gitremoteaddorigingit@github.com:<username>/<application_name>.git
gitpushoriginmaster


初期設定
=======
gitconfig--globaluser.name"FooBar"
gitconfig--globaluser.email"foo@bar.com"
gitconfig--globalcolor.uiauto

--globalオプションでホームディレクトリの.gitconfigへ書きだされる


リポジトリ初期化
==============
gitinit

./.gitディレクトリが作成される

基本設定の確認
============
gitvarGIT_COMMITTER_IDENT
gitvarGIT_AUTHOR_IDENT

最初のコミット
============
gitadd.
gitcommit-m"initialcommit"

gitdiff
============
変更内容の確認

-変更前の内容
+変更後の内容

gitdiff
　ステージングと作業コピーを比較

gitdiffHEAD
　gitcommitしていないすべての変更点を出力

gitdiff–-stagedまたは--cached
　ステージされている変更とコミットの内容を比較

gitadd
=======
gitadd[ファイル名]
gitadd-u=>バージョン管理されているファイルを一括でaddする
gitadd-A=>バージョン管理されていないファイル（新規ファイル）を一括でaddする
gitadd-p=>部分的にaddする時


gitcommit
==========
gitcommit-m"hogehoge"
　コミットする

gitcommit-a-m"hogehoge"
　gitadd-u,gitcommit-mを一括で

gitcommit-m"hogehoge"[ファイル名]
　指定したファイルのみをコミット

gitcommit--amend
　直近のコミットをやりなおし。ファイルをaddし忘れたときなど　


gitrm
=======
gitrm
ファイル削除

gitrm-f
ステージングのファイルを強制削除

gitrm--cached
ファイルを残しつつステージングのファイルを削除


gitstatus
==========
変更内容の要約


gitshow
========
コミットのログメッセージと変更内容が出力される


gitreset
=========
gitreset[ファイル名]
　次のコミットに含みたくないファイルを指定

gitreset
　すべてのaddしてきた物を指定したのと同じ

gitresetHEAD^
　最新のコミットを捨てる（一つ前のHEADに戻る）



gitrevert
===========
gitrevert[コミットオブジェクト]=>過去のコミットを打ち消す


gitfilter-branch
==================
全コミットからのファイル削除
gitfilter-branch--tree-filter'rm-fpasswords.txt'HEAD


gitlog
=======
変更履歴をみる

gitlog-<数字>
出力するコミット数を制限

gitlog-p
diffを表示

gitlog--decorate
タグやブランチを表示する


gitcheckout
=============
gitcheckout[PATH]=>インデックスに記録されている状態に復帰
gitcheckoutHEAD[PATH]=>最新のコミットに記録されたファイルに復帰

gittag
========
gittag[タグ名]


.gitignore
==========
.gitignoreファイルにバージョン管理の対象としないファイルを書く


バックアップ用リポジトリの作成
==========================
mkdir-p/repository/hoge.git
cd/repository/hoge.git
git--bareinit=>--bareワークツリーなしでリポジトリを作成するという意味

ワークディレクトリにもどって
gitpush/repository/hoge.gitmaster


gitclone
=========
バックアップからコピーしてくる

gitclone/repository/hoge.githoge

gitpush
========
元のリポジトリにブランチをすべて転送
gitpush=>gitpushoriginmasterと同じ
gitpush--tags=>tagをpush

gitpull
========
originから最新のコミットを取得


gitremote
==========
gitremoteadd[name][url]
リモートリポジトリを追加する

gitremoteshow[name]
リモートリポジトリの調査


ブランチを作る
============
gitbranch[ブランチ名]
gitcheckout[ブランチ名]

gitcheckout-b[ブランチ名]=>上記を一括で行う

gitbranch
===========
gitbranch
自分がどのブランチにいるかを知る

gitbranch　[ブランチ名]
　ブランチを作る

gitbranch-d[ブランチ名]
　ブランチを削除


gitcheckout
============
gitcheckout[ブランチ名]=>ブランチを切り替える

gitmerge
=========
gitmerge[ブランチ名]
ブランチとマージ

gitmerge--no-ff[ブランチ名]
ブランチのコミット履歴を取り込みマージ

gitbranch--merged
マージしたブランチを表示。gitmerge-d　で消せるようになる

gitbranch--no-merged
マージされていないブランチを表示

gitbranch-D
ブランチを強制削除


gitsubmodule
=============
gitsubmoduleadd[uri][dir]
gitsubmodulestatus
gitsubmoduleinit
gitsubmoduleupdate



流れ
====
gitclone[url]
cdproject
gitcheckout-bfeatureA
gitcommit
gitrebase-i(rebaseでコミットをひとつにまとめる時）
gitremoteaddmyfork[url]
gitpushmyforkfeatureA
gitrequest-pullorigin/mastermyfork(commiterに送る時の変更概要表示）
------------------
(origin/masterが変更されてた時、rebaseする）
gitfetchorigin
gitcheckoutfeatureA
gitrebaseorigin/master
gitpush-fmyforkfeatureA(強制pushする)
-------------------
(チョコ変更するとき)
gitcheckout-bfeatrueAv2origin/master
gitmerge--no-commit--squashfeatureA
(--squashオプションは、マージしたいブランチでのすべての作業をひとつのコミットにまとめ、それを現在のブランチの先頭にマージします。--no-commitオプションは、自動的にコミットを記録しないようGitに指示しています。こうすれば、別のブランチのすべての変更を取り込んでさらに手元で変更を加えたものを新しいコミットとして記録できるのです。)
gitcommit
gitpushmyforkfeatureAv2



マージ作業
=========
トリプルドット
gitdiffmaster...[ブランチ名]
(ブランチがmasterからブランチした時の分岐点とのdiffを表示する.gitdiffのみだと
masterの最新との比較がされるため。ふたつの参照のうちどちらか一方からのみたどれるコミット(つまり、両方からたどれるコミットは含まない)を指定します）

ダブルドット
gitdiffmaster..[ブランチ名]
ブランチ名からはたどれるけれど、masterからはたどれないすべてのコミット
